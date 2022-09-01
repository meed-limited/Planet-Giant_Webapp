import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import UserContext from "./context";
import { getChain, getNftAddress, TEST_NFT } from "constant/constant";

function UserDataProvider({ children }) {
  const { account, chainId, isInitialized, isWeb3Enabled } = useMoralis();

  const [userNFTs, setUserNFTs] = useState();
  const [balance, setBalance] = useState();
  const chain = getChain();
  const nftAddress = getNftAddress();

  const fetchNativeBalance = async () => {
    const options = {
      chain: chain,
      address: account,
    };
    const balance = await Moralis.Web3API.account.getNativeBalance(options);
    setBalance(balance.balance);
  };

  const fetchNFTsBalance = async () => {
    const options = { chain: chain, address: account, token_address: TEST_NFT };
    const NFT1 = await Moralis.Web3API.account.getNFTsForContract(options);

    const options2 = { chain: chain, address: account, token_address: nftAddress };
    const NFT2 = await Moralis.Web3API.account.getNFTsForContract(options2);

    const NFTs = { result: NFT1.result.concat(NFT2.result), total: NFT1.result.length + NFT2.result.length };
    setUserNFTs(NFTs);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUserData() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within UserDataProvider");
  }
  return context;
}

export { UserDataProvider, useUserData };
