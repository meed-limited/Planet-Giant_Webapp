import { useMoralis, useNativeBalance } from "react-moralis";

const styles = {
  text: {
    textAlign: "center",
    whiteSpace: "nowrap",
    color: "black",
  },
};

function NativeBalance(props) {
  const { data: balance } = useNativeBalance(props);
  const { account, isAuthenticated } = useMoralis();

  if (!account || !isAuthenticated) return null;

  console.log(balance.formatted);

  return <div style={styles.text}>{balance.formatted}</div>;
}

export default NativeBalance;
