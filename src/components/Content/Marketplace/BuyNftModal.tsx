import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis-v1";
import { getMarketplaceAddress } from "../../../constant/constant";
import { buyNFT } from "../../../helpers/contractCall/writeCall";
import { getEllipsisTxt } from "../../../helpers/formatters";
import {
  getBoostAttributes,
  getLevelAttributes,
  getLevelForTitle,
  getTypeAttributes,
} from "../../../helpers/getNftAttributes";
import { Modal, Spin, Badge, Card, message } from "antd";
import copy from "copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";

const styles = {
  NftImage: {
    width: "250px",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  whiteContainer: {
    marginTop: "10px",
    borderRadius: "20px",
    background: "white",
    border: "1px solid",
    textAlign: "left",
    padding: "15px",
    fontSize: "17px",
    color: "black",
  },
} as const;

const BuyNftModal: React.FC<any> = ({ nftToBuy, setVisibility, visible }) => {
  const { account } = useMoralis();
  const [loading, setLoading] = useState(false);
  const marketAddress = getMarketplaceAddress();

  const copyToClipboard = (toCopy: string) => {
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

  const titleLevel = nftToBuy != null ? getLevelForTitle(nftToBuy) : "";

  return (
    <Modal
      title={`Buy ${nftToBuy?.collectionName} ${titleLevel} #${nftToBuy?.tokenId} ?`}
      visible={visible}
      onCancel={() => setVisibility(false)}
      onOk={() => purchase()}
      okText="Buy"
    >
      <Spin spinning={loading}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            size="small"
            style={{ width: "190px", border: "2px solid #e7eaf3" }}
            cover={
              <Badge.Ribbon color="green" text={`${nftToBuy?.price} CRO`}>
                <img src={nftToBuy?.image} alt="" style={styles.NftImage} />
              </Badge.Ribbon>
            }
          />
        </div>

        <div style={styles.whiteContainer}>
          {nftToBuy && (
            <>
              <h3 style={{ textAlign: "center", fontSize: "21px" }}>
                {nftToBuy?.collectionName} {getLevelForTitle(nftToBuy)}
              </h3>
              <h4 style={{ textAlign: "center", fontSize: "14px" }}>{nftToBuy?.metadata.description}</h4>
              <br></br>
              <div>
                Boost:
                <div style={{ float: "right" }}>
                  {getBoostAttributes(nftToBuy)}
                  {getTypeAttributes(nftToBuy)}{" "}
                </div>
              </div>
              <div>
                Level:
                <div style={{ float: "right" }}>{getLevelAttributes(nftToBuy)} </div>
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
