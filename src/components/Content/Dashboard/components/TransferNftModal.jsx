import { useState } from "react";
import { useMoralis } from "react-moralis";
import AddressInput from "../../../AddressInput";
import { transferNft } from "../../../../helpers/contractCall/writeCall";
import { Modal, Spin, Input } from "antd";

const TransferNftModal = ({ nftToTransfer, setVisibility, visible }) => {
  const { chainId } = useMoralis();
  const [receiverToSend, setReceiver] = useState(null);
  const [amountToSend, setAmount] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const transfer = async (nft, amount, receiver) => {
    setIsPending(true);
    const success = await transferNft(chainId, nft, amount, receiver);
    if (success) {
      setIsPending(false);
      setVisibility(false);
    } else setIsPending(false);
  };

  const handleCancel = () => {
    setVisibility(false);
  };

  return (
    <Modal
      title={`Transfer ${nftToTransfer?.name || "NFT"}`}
      visible={visible}
      onCancel={handleCancel}
      onCloseButtonPressed={() => setVisibility(false)}
      onOk={() => transfer(nftToTransfer, amountToSend, receiverToSend)}
      confirmLoading={isPending}
      okText="Send"
      bodyStyle={{ width: "95%", margin: "auto" }}
    >
      <Spin spinning={isPending} size="large">
        <AddressInput autoFocus placeholder="Receiver" onChange={setReceiver} style={{ marginBottom: "15px" }} />
        {nftToTransfer && nftToTransfer.contract_type === "ERC1155" && (
          <Input placeholder="amount to send" onChange={(e) => handleChange(e)} />
        )}
      </Spin>
    </Modal>
  );
};

export default TransferNftModal;
