import { useState } from "react";
import { useMoralis } from "react-moralis";
import { useUserData } from "userContext/UserContextProvider";
import Blockie from "../Blockie";
import Address from "../Address/Address";
import { connectors } from "./config";
import { getExplorer } from "helpers/networks";
import { getEllipsisTxt } from "helpers/formatters";
import { Button, Card, Modal } from "antd";
import { SelectOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";

const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "7px",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
  },
  button: {
    height: "40px",
    paddingInline: "20px",
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: "0.5px",
    fontSize: "15px",
    marginBlock: "20px",
    border: "none",
    background: "black",
    color: "white",
  },
  buttonModal: {
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "20px",
  },
  bodyModal: {
    width: "350px",
    padding: "15px",
    fontSize: "17px",
    fontWeight: "500",
  },
  text: {
    color: "#21BF96",
  },
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px",
    cursor: "pointer",
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px",
  },
};

function Account() {
  const { authenticate, isAuthenticated, account, chainId, logout } = useMoralis();
  const { isMobile } = useUserData();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  const switchChain = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x152" }],
      });
      console.log("changed");
    } catch (e) {
      console.error(e);
    }
  };

  if (!isAuthenticated || !account) {
    return (
      <>
        <Button
          shape="round"
          type="primary"
          style={{ ...styles.button, marginInline: isMobile ? "0px" : "20px" }}
          onClick={() => setIsAuthModalVisible(true)}
        >
          Connect Wallet
        </Button>
        <Modal
          visible={isAuthModalVisible}
          footer={null}
          onCancel={() => setIsAuthModalVisible(false)}
          bodyStyle={{ ...styles.bodyModal, margin: "auto" }}
          style={{ fontSize: "16px", fontWeight: "500" }}
          width="340px"
        >
          <div style={styles.buttonModal}>Connect Wallet</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {connectors.map(({ title, icon, connectorId }, key) => (
              <div
                style={styles.connector}
                key={key}
                onClick={async () => {
                  try {
                    if (chainId !== "0x61" || chainId !== "0x38") {
                      await switchChain();
                    }
                    await authenticate({
                      provider: connectorId,
                      signingMessage: "Welcome to Planet Giants!",
                    });
                    window.localStorage.setItem("connectorId", connectorId);

                    setIsAuthModalVisible(false);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                <img src={icon} alt={title} style={styles.icon} />
                <Text style={{ fontSize: "14px" }}>{title}</Text>
              </div>
            ))}
          </div>
        </Modal>
      </>
    );
  }

  return (
    <>
      {!isMobile ? (
        <div style={styles.account} onClick={() => setIsModalVisible(true)}>
          <p style={{ marginRight: "5px", ...styles.text }}>{getEllipsisTxt(account, 6)}</p>
          <Blockie currentWallet scale={3} />
        </div>
      ) : (
        <div style={{ paddingTop: "30px" }} onClick={() => setIsModalVisible(true)}>
          <Blockie currentWallet scale={5} />
        </div>
      )}
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={styles.bodyModal}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
        Account
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address avatar="left" size={6} copyable style={{ fontSize: "20px" }} />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a href={`${getExplorer(chainId)}/address/${account}`} target="_blank" rel="noreferrer">
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={async () => {
            await logout();
            window.localStorage.removeItem("connectorId");
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;
