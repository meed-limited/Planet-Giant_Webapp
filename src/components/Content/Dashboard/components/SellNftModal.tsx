import { ReactElement, SetStateAction, useState } from "react";
import { useMoralis } from "react-moralis";
import { getMarketplaceAddress } from "../../../../constant/constant";
import { approveNFTcontract, listOnMarketPlace } from "../../../../helpers/contractCall/writeCall";
import { checkNftApproval } from "../../../../helpers/contractCall/readCall";
import { useMoralisDb } from "../../../../hooks/useMoralisDb";
import { Modal, Button, Spin, Input, Card } from "antd";
import { getLevelForTitle } from "../../../../helpers/getNftAttributes";

const styles = {
  card: {
    width: "190px",
    border: "2px solid #e7eaf3",
    margin: "auto",
    marginBottom: "15px",
  },
  NftImage: {
    width: "250px",
    height: "190px",
    margin: "auto",
  },
} as const;

const SellNftModal: React.FC<any> = ({ nftToSell, setVisibility, visible }): ReactElement => {
  const { account } = useMoralis();
  const { addItemImage, saveMarketItemInDB } = useMoralisDb();
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const marketAddress = getMarketplaceAddress();

  const list = async (nft: NFTinDB, listPrice: number) => {
    setLoading(true);
    try {
      if (account) {
        const approval = await checkNftApproval(account);

        if (!approval) {
          await approveNFTcontract(nft.token_address, marketAddress);
        }
        const res = await listOnMarketPlace(nft, listPrice, marketAddress);
        if (res.success === true) {
          setVisibility(false);
          addItemImage(nftToSell);
          saveMarketItemInDB(nft, listPrice, res.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const titleLevel = nftToSell != null ? getLevelForTitle(nftToSell) : "";

  return (
    <Modal
      key={nftToSell?.token_id}
      title={`List ${nftToSell?.name} ${titleLevel} #${nftToSell?.token_id} For Sale?`}
      visible={visible}
      onCancel={() => setVisibility(false)}
      onOk={() => list(nftToSell, price)}
      okText="List"
      footer={[
        <Button onClick={() => setVisibility(false)}>Cancel</Button>,
        <Button onClick={() => list(nftToSell, price)} type="primary">
          Sell
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <Card
          size="small"
          style={styles.card}
          cover={<img src={nftToSell?.image} alt="" style={styles.NftImage} />}
          key={nftToSell?.token_id}
        ></Card>
        <label style={{ color: "white" }}>Set the price in CRO:</label>
        <Input autoFocus onChange={(e: { target: { value: SetStateAction<any> } }) => setPrice(e.target.value)} />
      </Spin>
    </Modal>
  );
};

export default SellNftModal;
