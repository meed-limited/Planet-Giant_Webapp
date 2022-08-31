import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const styles = {
  menuItems: {
    backgroundColor: "transparent",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    paddingTop: "10px",
    borderBottom: "none",
    fontSize: "15px",
  },
};

function MenuItems() {
  const [current, setCurrent] = useState("/");

  const onClick = (e) => {
    setCurrent(e.key);
  };

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const menuItems = [
    getItem(<NavLink to="/Dashboard">Dashboard</NavLink>, "nft"),
    getItem(<NavLink to="/MarketPlace">Marketplace</NavLink>, "nftMarket"),
    // getItem(<NavLink to="/Transactions">Transactions</NavLink>, "transactions"),
  ];

  return (
    <>
      <Menu
        onClick={onClick}
        mode="horizontal"
        items={menuItems}
        selectedKeys={[current]}
        defaultOpenKeys={["/"]}
        style={styles.menuItems}
      />
    </>
  );
}

export default MenuItems;
