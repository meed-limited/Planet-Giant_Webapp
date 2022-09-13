import { SetStateAction, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

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
} as const;

const MenuItems: React.FC<any> = () => {
  const [current, setCurrent] = useState("/");

  const onClick = (e: { key: SetStateAction<string> }) => {
    setCurrent(e.key);
  };

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  };

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
};

export default MenuItems;
