import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useUserData } from "userContext/UserContextProvider";
import DisplayNFT from "components/DisplayNFT";
import AddressInput from "../AddressInput";
import { transferNft } from "helpers/contractCall/writeCall";
import { Loading } from "web3uikit";
import { Input, Spin, Divider, Modal } from "antd";

const styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    fontSize: "20px",
    gap: "10px",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    flexGrow: "0",
    border: "solid #75e287 1px",
    borderRadius: "7px",
    gap: "5px",
    padding: "15px 30px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 10px",
    fontSize: "17px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
  },
  subDiv: {
    display: "inline-flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
};

const L3PWallet = () => {
  const { chainId } = useMoralis();
  const { userNFTs } = useUserData();
  const [loading, setLoading] = useState(true);
  const [visible, setVisibility] = useState(false);
  const [receiverToSend, setReceiver] = useState(null);
  const [amountToSend, setAmount] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [nftToSend, setNftToSend] = useState(null);

  useEffect(() => {
    if (userNFTs === undefined) {
      setLoading(true);
    } else setLoading(false);
    return;
  }, [userNFTs]);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTransferClick = (nft) => {
    setNftToSend(nft);
    setVisibility(true);
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
    <div style={styles.content}>
      {loading ? (
        <div>
          <Loading fontSize={20} size={20} spinnerColor="#2E7DAF" spinnerType="wave" text="Loading..." />
        </div>
      ) : (
        <>
          <div style={styles.box}>
            <div style={styles.title}>Planet Giants NFTs:</div>
            <Divider />

            <DisplayNFT userNFTs={userNFTs} action={handleTransferClick} chainId={chainId} isSelection={false} />

            <Modal
              title={`Transfer ${nftToSend?.name || "NFT"}`}
              visible={visible}
              onCancel={handleCancel}
              onCloseButtonPressed={() => setVisibility(false)}
              onOk={() => transfer(nftToSend, amountToSend, receiverToSend)}
              confirmLoading={isPending}
              okText="Send"
              bodyStyle={{
                width: "700px",
              }}
            >
              <Spin spinning={isPending} size="large">
                <AddressInput autoFocus placeholder="Receiver" onChange={setReceiver} />
                {nftToSend && nftToSend.contract_type === "erc1155" && (
                  <Input placeholder="amount to send" onChange={(e) => handleChange(e)} />
                )}
              </Spin>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default L3PWallet;
