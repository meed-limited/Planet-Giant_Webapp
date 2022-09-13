import { Skeleton } from "antd";
import Blockies from "react-blockies";
import { useMoralis } from "react-moralis";

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

function Blockie({ seed, size, scale }: { seed: string; size?: number; scale?: number }) {
  const { account, isAuthenticated } = useMoralis();
  if (!seed && (!account || !isAuthenticated)) return <Skeleton.Avatar active size={40} />;

  if (size) return <Blockies seed={seed.toLowerCase()} size={size} className="identicon" />;
  if (scale) return <Blockies seed={seed.toLowerCase()} size={size} scale={scale} className="identicon" />;

  return <Blockies seed={seed.toLowerCase()} className="identicon" />;
}

export default Blockie;
