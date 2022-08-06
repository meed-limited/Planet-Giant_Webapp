import { WarningOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { menuItems } from "./Chains";

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
    fontSize: "30px",
    fontWeight: "800",
    letterSpacing: "1px",
  },
};

const ChainVerification = ({ setIsSupportedChain }) => {
  const { chainId, isAuthenticated } = useMoralis();
  const onSupportedChain = menuItems?.filter((item) => item.key === chainId).length > 0;

  useEffect(() => {
    if (chainId && isAuthenticated) {
      setIsSupportedChain(onSupportedChain);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, isAuthenticated, onSupportedChain]);

  return (
    <>
      {isAuthenticated && !onSupportedChain && (
        <div style={styles.container}>
          <div style={styles.smallContainer}>
            <p style={styles.text}>
              <WarningOutlined style={{ color: "red", fontSize: "40px" }} />
              <span style={{ color: "red", fontSize: "30px" }}> Wrong chain </span>
              <WarningOutlined style={{ color: "red", fontSize: "40px" }} />
              <br></br>
              <br></br>
              This chain is not supported. <br></br>Please select a compatible network in top-right corner
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChainVerification;
