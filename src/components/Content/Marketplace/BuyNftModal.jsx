import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { getMarketplaceAddress } from "constant/constant";
import { buyNFT } from "helpers/contractCall/writeCall";
import copy from "copy-to-clipboard";
import { Modal, Spin, Badge, Card, message } from "antd";
import { getEllipsisTxt } from "helpers/formatters";
import { CopyOutlined } from "@ant-design/icons";

const styles = {
  NftImage: {
    width: "250px",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  transparentContainer: {
    marginTop: "10px",
    borderRadius: "20px",
    background: "white",
    border: "1px solid",
    textAlign: "left",
    padding: "15px",
    fontSize: "17px",
    color: "black",
  },
};

const BuyNftModal = ({ nftToBuy, setVisibility, visible }) => {
  const { account } = useMoralis();
  const [loading, setLoading] = useState(false);
  const marketAddress = getMarketplaceAddress();

  const copyToClipboard = (toCopy) => {
    copy(toCopy);
    message.config({
      maxCount: 1,
    });
    message.success(`"${toCopy}" copied!`, 2);
  };

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

  const getAttributesBoost = (nft) => {
    const attributes = nft.metadata?.attributes;
    const boost = attributes.filter((item) => item.display_type === "Booster");
    return boost[0].value;
  };

  const getAttributesLevel = (nft) => {
    const attributes = nft.metadata?.attributes;
    const boost = attributes.filter((item) => item.trait_type === "Level");
    return boost[0].value;
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

        <div style={styles.transparentContainer}>
          {nftToBuy && (
            <>
              <h3 style={{ textAlign: "center", fontSize: "21px" }}>{nftToBuy?.collectionName}</h3>
              <h4 style={{ textAlign: "center", fontSize: "14px" }}>{nftToBuy?.metadata.description}</h4>
              <br></br>
              <div>
                Boost:
                <div style={{ float: "right" }}>{getAttributesBoost(nftToBuy)} </div>
              </div>
              <div>
                Level:
                <div style={{ float: "right" }}>{getAttributesLevel(nftToBuy)} </div>
              </div>
              <div>
                NFT Id: <div style={{ float: "right" }}>{nftToBuy?.tokenId} </div>
              </div>
              <div>
                Address:
                <div style={{ float: "right" }}>
                  {getEllipsisTxt(nftToBuy?.token_address, 5)}{" "}
                  <CopyOutlined style={{ color: "blue" }} onClick={() => copyToClipboard(nftToBuy?.token_address)} />
                </div>
              </div>
            </>
          )}
        </div>
      </Spin>
    </Modal>
  );
};

export default BuyNftModal;
