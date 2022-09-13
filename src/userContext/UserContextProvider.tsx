import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import UserContext from "./context";
import { useWindowWidthAndHeight } from "../hooks/useWindowWidthAndHeight";
import { getChain, getNftAddress } from "../constant/constant";

const UserDataProvider: React.FC<any> = ({ children }) => {
  const { account, chainId, isInitialized, isWeb3Enabled } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const [width] = useWindowWidthAndHeight();
  const [userNFTs, setUserNFTs] = useState<React.SetStateAction<any>>();
  const [balance, setBalance] = useState<React.SetStateAction<any>>();
  const chain = getChain();
  const nftAddress = getNftAddress();

  const isMobile = width <= 768;

  const fetchNativeBalance = async () => {
    if (chainId && account) {
      const options = {
        chain: chain,
        address: account,
      } as const;
      const balance = await Web3Api.account.getNativeBalance(options);
      setBalance(balance.balance);
    }
  };

  const fetchNFTsBalance = async () => {
    if (chainId && account && nftAddress) {
      const options = { chain: chain, address: account, token_address: nftAddress } as const;
      const NFT = await Web3Api.account.getNFTsForContract(options);
      if (NFT && NFT.result) {
        const NFTs = { result: NFT.result, total: NFT.result.length };
        setUserNFTs(NFTs);
      }
    }
  };

  useEffect(() => {
    if (isInitialized && isWeb3Enabled) {
      fetchNFTsBalance();
      fetchNativeBalance();
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, isWeb3Enabled, account, chainId]);

  return (
    <UserContext.Provider
      value={{
        chainId,
        account,
        balance,
        setBalance,
        userNFTs,
        setUserNFTs,
        isMobile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

function useUserData(): any {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within UserDataProvider");
  }
  return context;
}

export { UserDataProvider, useUserData };
