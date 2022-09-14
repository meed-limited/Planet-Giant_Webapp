import React from "react";
import { WarningOutlined } from "@ant-design/icons";

const styles = {
  container: {
    display: "flex",
    width: "100%",
    height: "40vw",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: "auto",
  },
  smallContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    padding: "30px 10px",
    backgroundColor: "white",
    border: "solid #75e287 1px",
    borderRadius: "15px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 10px",
  },
  text: {
    padding: "40px",
    color: "black",
    fontSize: "25px",
    fontWeight: "800",
    letterSpacing: "1px",
  },
} as const;

const WrongChain: React.FC<any> = ({ tab }) => {
  const switchMessageToDisplay = () => {
    switch (tab) {
      case "wallet":
        return (
          <>
            <WarningOutlined style={{ color: "red", fontSize: "40px" }} />
            <span style={{ color: "red", fontSize: "30px" }}> Wrong chain </span>
            <WarningOutlined style={{ color: "red", fontSize: "40px" }} />
            <br></br>
            <br></br>
            The Wallet tab is only available on Ethereum & BNB chain.
          </>
        );
      case "staking":
        return (
          <>
            <WarningOutlined style={{ color: "red", fontSize: "40px" }} />
            <span style={{ color: "red", fontSize: "30px" }}> Wrong chain </span>
            <WarningOutlined style={{ color: "red", fontSize: "40px" }} />
            <br></br>
            <br></br>
            The native staking is only available on the BNB chain.
          </>
        );
      case "bridge":
        return (
          <>
            <WarningOutlined style={{ color: "red", fontSize: "40px" }} />
            <span style={{ color: "red", fontSize: "30px" }}> Wrong chain </span>
            <WarningOutlined style={{ color: "red", fontSize: "40px" }} />
            <br></br>
            <br></br>
            The ETH-BNB bridges are only available on Ethereum & BNB Chain.<br></br>
          </>
        );
      case "bridge-leprichain":
        return (
          <>
            <WarningOutlined style={{ color: "red", fontSize: "40px" }} />
            <span style={{ color: "red", fontSize: "30px" }}> Wrong chain </span>
            <WarningOutlined style={{ color: "red", fontSize: "40px" }} />
            <br></br>
            <br></br>
            The LEPRICHAIN bridges are only available on Leprichain.
          </>
        );
      default:
        return "Connect your wallet to start!";
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.smallContainer}>
        <p style={styles.text}>{switchMessageToDisplay()}</p>
      </div>
    </div>
  );
};

export default WrongChain;
