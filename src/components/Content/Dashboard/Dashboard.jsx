import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useUserData } from "userContext/UserContextProvider";
import { Divider, Spin } from "antd";
import { Token, NFTs, TransferNftModal, SellNftModal } from "./components";

const styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    minWidth: "350px",
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
    paddingBlock: "15px",
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

const Dashboard = () => {
  const { chainId } = useMoralis();
  const { userNFTs } = useUserData();
  const [loading, setLoading] = useState(true);
  const [visibleTransfer, setVisibilityTransfer] = useState(false);
  const [visibleSell, setVisibilitySell] = useState(false);
  const [nftToTransfer, setNftToTransfer] = useState(null);
  const [nftToSell, setNftToSell] = useState(null);

  useEffect(() => {
    if (userNFTs === undefined) {
      setLoading(true);
    } else setLoading(false);
    return;
  }, [userNFTs]);

  const handleTransferClick = (nft) => {
    setNftToTransfer(nft);
    setVisibilityTransfer(true);
  };

  const handleSellClick = (nft) => {
    setNftToSell(nft);
    setVisibilitySell(true);
  };

  return (
    <div style={styles.content}>
      {loading ? (
        <div>
          <Spin spinning={loading} />
        </div>
      ) : (
        <>
          <div style={styles.box}>
            <div style={styles.title}>Planet Giant - Tokens:</div>
            <Divider />
            <Token />
          </div>

          <div style={styles.box}>
            <div style={styles.title}>Planet Giant - NFTs:</div>
            <Divider />

            <NFTs
              userNFTs={userNFTs}
              action1={handleTransferClick}
              action2={handleSellClick}
              chainId={chainId}
              isSelection={false}
            />

            <TransferNftModal
              nftToTransfer={nftToTransfer}
              setVisibility={setVisibilityTransfer}
              visible={visibleTransfer}
            />
            <SellNftModal nftToSell={nftToSell} setVisibility={setVisibilitySell} visible={visibleSell} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
