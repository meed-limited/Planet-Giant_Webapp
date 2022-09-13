import { useMoralis } from "react-moralis";

const styles = {
  container: {
    display: "flex",
    width: "100%",
    height: "30vw",
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
} as const;

const AccountVerification = () => {
  const { isAuthenticated } = useMoralis();

  const message = "Connect your wallet";

  return (
    <>
      {!isAuthenticated && (
        <div style={styles.container}>
          <div style={styles.smallContainer}>
            <div style={styles.text}>{message}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountVerification;
