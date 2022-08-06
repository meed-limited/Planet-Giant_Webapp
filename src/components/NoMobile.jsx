const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: "auto",
  },
  smallContainer: {
    display: "flex",
    justifyContent: "center",
    width: "70%",
    padding: "30px 10px",
    backgroundColor: "white",
    border: "solid #75e287 1px",
    borderRadius: "15px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 10px",
  },
  text: {
    padding: "60px",
    color: "black",
    fontSize: "17px",
    fontWeight: "500",
    letterSpacing: "1px",
  },
};

const NoMobile = () => {
  return (
    <>
      <div style={styles.container}>
        <div style={styles.smallContainer}>
          <p style={styles.text}>
            Sorry, this dapp is not available on mobile version just yet.
            <br></br>
            <br></br>
            Give us a bit more time!
          </p>
        </div>
      </div>
    </>
  );
};

export default NoMobile;
