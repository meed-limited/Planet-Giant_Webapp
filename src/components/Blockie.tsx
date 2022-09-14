import React from "react";
import { useMoralis } from "react-moralis";
import Blockies from "react-blockies";
import { Skeleton } from "antd";

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

interface Props {
  seed: string;
  size?: number;
  scale?: number;
}

const Blockie: React.FC<Props> = ({ seed, size, scale }) => {
  const { account, isAuthenticated } = useMoralis();
  if (!seed && (!account || !isAuthenticated)) return <Skeleton.Avatar active size={40} />;

  if (size) return <Blockies seed={seed.toLowerCase()} size={size} className="identicon" />;
  if (scale) return <Blockies seed={seed.toLowerCase()} size={size} scale={scale} className="identicon" />;

  return <Blockies seed={seed.toLowerCase()} className="identicon" />;
};

export default Blockie;
