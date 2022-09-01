/*eslint no-dupe-keys: "Off"*/
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import BuyNftModal from "./BuyNftModal";
import { useMoralisDb } from "hooks/useMoralisDb";
import { getExplorer } from "helpers/networks";
import { FALLBACK_IMG } from "constant/constant";
import { Card, Image, Tooltip, Badge } from "antd";
import { FileSearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
const { Meta } = Card;

const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "center",
    margin: "0 auto",
    maxWidth: "1000px",
    gap: "15px",
  },
};

function Marketplace({ isSupportedChain }) {
  const { chainId, isAuthenticated } = useMoralis();
  const { getMarketItemData, parseAllData } = useMoralisDb();
  const [marketItems, setMarketItems] = useState([]);
  const [nftToBuy, setNftToBuy] = useState(null);
  const [visible, setVisibility] = useState(false);

  const getMarketItems = async () => {
    const res = await getMarketItemData();
    const parsedMarketItems = await parseAllData(res);
    setMarketItems(parsedMarketItems);
  };

  const handleBuyClick = (nft) => {
    setNftToBuy(nft);
    setVisibility(true);
  };

  useEffect(() => {
    getMarketItems();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(marketItems);

  return (
    <>
      {isAuthenticated && isSupportedChain && (
        <div style={{ marginTop: "40px" }}>
          <div style={styles.NFTs}>
            {marketItems &&
              marketItems.length > 0 &&
              marketItems.slice(0, 50).map((nft, index) => {
                return (
                  <Card
                    hoverable
                    size="small"
                    actions={[
                      <Tooltip title="View On Blockexplorer">
                        <FileSearchOutlined
                          onClick={() => window.open(`${getExplorer(chainId)}address/${nft.token_address}`, "_blank")}
                        />
                      </Tooltip>,
                      <Tooltip title="Buy NFT">
                        <ShoppingCartOutlined onClick={() => handleBuyClick(nft)} />
                      </Tooltip>,
                    ]}
                    style={{ width: "190px", border: "2px solid #e7eaf3" }}
                    cover={
                      <>
                        <Image
                          preview={false}
                          src={nft.image || "error"}
                          fallback={FALLBACK_IMG}
                          alt=""
                          style={{ height: "190px" }}
                          onClick={() => handleBuyClick(nft)}
                        />
                        {nft && <Badge.Ribbon text="Buy Now" color="green"></Badge.Ribbon>}
                      </>
                    }
                    key={index}
                  >
                    <Meta title={nft.name} description={`#${nft.tokenId}`} />
                  </Card>
                );
              })}
          </div>
          <BuyNftModal nftToBuy={nftToBuy} setVisibility={setVisibility} visible={visible} />
        </div>
      )}
    </>
  );
}

export default Marketplace;
