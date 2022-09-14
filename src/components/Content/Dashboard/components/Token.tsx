import React from "react";
import { CRO_TOKEN } from "../../../../constant/constant";
import { useCoingeckoAPI } from "../../../../hooks/useCoingeckoAPI";
import { useUserData } from "../../../../userContext/UserContextProvider";
import cronos_logo_big from "../../../../assets/cronos_logo_big.png";
import { Button } from "antd";

const styles = {
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white",
    width: "60%",
    minWidth: "320px",
    alignItems: "center",
    flexGrow: "0",
    border: "solid #75e287 1px",
    borderRadius: "7px",
    gap: "5px",
    padding: "15px 30px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 10px",
    fontSize: "17px",
  },
  chainLogo: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
  },
  item: {
    display: "inline-flex",
    width: "100%",
    fontWeight: "600",
  },
  priceText: {
    display: "flex",
    justifyContent: "flex-end",
    color: "grey",
    fontSize: "15px",
  },
} as const;

const Token: React.FC<any> = () => {
  const { balance } = useUserData();
  const { price } = useCoingeckoAPI(CRO_TOKEN);

  const formatedBalance = parseInt(balance) / 10 ** 18;

  return (
    <div style={styles.box}>
      <div style={styles.chainLogo}>
        <img src={cronos_logo_big} alt="Chain logo" width={"180px"} />
      </div>
      <div style={{ ...styles.item, paddingBottom: "10px" }}>
        <div style={{ justifyContent: "flex-start" }}>CRO Balance:</div>
        <div style={{ ...styles.item, justifyContent: "flex-end", flex: "1" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <div>{formatedBalance.toFixed(2)} CRO</div>
            {price && <div style={styles.priceText}>${(formatedBalance * price).toFixed(2)}</div>}
          </div>

          <div style={{ marginLeft: "15px" }}>
            <a href="https://swap.crodex.app/#/swap" target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round">
                Go
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Token;
