import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import { useMoralis } from "react-moralis";
import { NoMobile, NativeBalance } from "./components";
import { Account, AccountVerification } from "./components/Account";
import { Chains, ChainVerification } from "./components/Chains";
import L3PWallet from "components/Wallet/L3PWallet";
import { useWindowWidthAndHeight } from "./hooks/useWindowWidthAndHeight";
import { Layout } from "antd";
import background from "./assets/background.jpg";
import ultranova_logo from "./assets/ultranova_logo.png";
import "antd/dist/antd.css";
import "./style.css";

const { Header } = Layout;

const styles = {
  layout: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
    overflow: "auto",
    fontFamily: "Sora, sans-serif",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    color: "#041836",
    marginTop: "100px",
    padding: "10px",
    overflow: "auto",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    paddingRight: "10px",
    fontSize: "15px",
    fontWeight: "600",
  },
  adminButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    color: "white",
    cursor: "pointer",
    borderRadius: "25px",
    width: "100px",
    height: "40px",
  },
};
const App = () => {
  const { account, isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();
  const [width] = useWindowWidthAndHeight();
  const [isSupportedChain, setIsSupportedChain] = useState("");

  const isMobile = width <= 768;

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3({ provider: connectorId });
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={styles.layout}>
      {isMobile && <NoMobile />}
      {!isMobile && (
        <Router>
          <Header style={styles.header}>
            <Logo />
            <div style={styles.headerRight}>
              <Chains />
              <NativeBalance />
              <Account />
            </div>
          </Header>

          <div style={styles.content}>
            <AccountVerification />
            <ChainVerification setIsSupportedChain={setIsSupportedChain} />

            {isAuthenticated && account && isSupportedChain && (
              <Routes>
                <Route path="/wallet" element={<L3PWallet />} />

                <Route path="*" element={<Navigate to="/wallet" />} />
                <Route path="/nonauthenticated" element={<>Please login using the "Authenticate" button</>} />
              </Routes>
            )}
          </div>
        </Router>
      )}
    </Layout>
  );
};

export const Logo = () => <img src={ultranova_logo} alt="ultranova_logo" width="180px" />;

export default App;
