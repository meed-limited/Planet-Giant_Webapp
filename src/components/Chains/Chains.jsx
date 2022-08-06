import { useEffect, useState } from "react";
import { useChain } from "react-moralis";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { CronosLogo } from "./Logos";

const styles = {
  item: {
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    minWidth: "145px",
    border: "0",
    borderRadius: "7px",
  },
};

export const menuItems = [
  // {
  //   key: "0x1",
  //   value: "Ethereum",
  //   icon: <ETHLogo />,
  //   label: "Ethereum",
  // },
  // {
  //   key: "0x38",
  //   value: "BNB Chain",
  //   icon: <BSCLogo />,
  //   label: "BNB Chain",
  // },
  {
    key: "0x19",
    value: "Cronos",
    icon: <CronosLogo />,
    label: "Cronos",
  },
  {
    key: "0x152",
    value: "Cronos testnet",
    icon: <CronosLogo />,
    label: "Cronos testnet",
  },
];

function Chains() {
  const { switchNetwork, chainId } = useChain();
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (!chainId) return undefined;
    const newSelected = menuItems.find((item) => item.key === chainId);
    setSelected(newSelected);
    console.log("current chainId: ", chainId);
    return;
  }, [chainId]);

  const handleMenuClick = async (e) => {
    console.log("switch to: ", e.key);
    await switchNetwork(e.key);
    window.location.reload();
  };

  useEffect(() => {
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const menu = <Menu onClick={handleMenuClick} items={menuItems} style={styles.item} />;

  return (
    <div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button key={selected?.key} icon={selected?.icon} style={{ ...styles.button, ...styles.item }}>
          {!selected && <span style={{ marginLeft: "5px" }}>Select Chain</span>}
          {selected && <span style={{ marginLeft: "5px" }}>{selected?.value}</span>}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}

export default Chains;
