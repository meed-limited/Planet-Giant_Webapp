import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { getMarketplaceAddress } from "constant/constant";
import { buyNFT } from "helpers/contractCall/writeCall";
import { Modal, Spin, Badge, Card } from "antd";

const styles = {
  NftImage: {
    width: "250px",
    borderRadius: "10px",
    marginBottom: "15px",
  },
};

const BuyNftModal = ({ nftToBuy, setVisibility, visible }) => {
  const { account } = useMoralis();
  const [loading, setLoading] = useState(false);
  const marketAddress = getMarketplaceAddress();

  const purchase = async () => {
    setLoading(true);
    const tokenAdd = nftToBuy.token_address;
    const res = await buyNFT(tokenAdd, marketAddress, nftToBuy);

    if (res) {
      updateSoldMarketItem();
      setVisibility(false);
    }
    setLoading(false);
  };

  const updateSoldMarketItem = async () => {
    const id = nftToBuy?.objectId;
    const marketList = Moralis.Object.extend("CreatedMarketItems");
    const query = new Moralis.Query(marketList);
    await query.get(id).then((obj) => {
      obj.set("sold", true);
      obj.set("owner", account);
      obj.set("collectionName", nftToBuy.collectionName);
      obj.save();
    });
  };

  return (
    <Modal
      title={`Buy "${nftToBuy?.collectionName}" #${nftToBuy?.tokenId} ?`}
      visible={visible}
      onCancel={() => setVisibility(false)}
      onOk={() => purchase()}
      okText="Buy"
    >
      <Spin spinning={loading}>
        <div style={{ width: "250px", display: "flex", justifyContent: "center" }}>
          <Card
            size="small"
            style={{ width: "190px", border: "2px solid #e7eaf3" }}
            cover={
              <>
                <Badge.Ribbon color="green" text={`${nftToBuy?.price} CRO`}>
                  <img src={nftToBuy?.image} alt="" style={styles.NftImage} />
                </Badge.Ribbon>
              </>
            }
          ></Card>
        </div>
      </Spin>
    </Modal>
  );
};

export default BuyNftModal;
