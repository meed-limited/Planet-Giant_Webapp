import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import UserContext from "./context";
import { TEST_NFT, TEST_NFT_PERSO } from "constant/constant";

function UserDataProvider({ children }) {
  const { account, chainId, isInitialized, isWeb3Enabled } = useMoralis();
  const [userNFTs, setUserNFTs] = useState();

  const fetchNFTsBalance = async () => {
    const options = { chain: "0x152", address: account, token_address: TEST_NFT };
    const NFT1 = await Moralis.Web3API.account.getNFTsForContract(options);

    const options2 = { chain: "0x152", address: account, token_address: TEST_NFT_PERSO };
    const NFT2 = await Moralis.Web3API.account.getNFTsForContract(options2);

    const NFTs = { result: NFT1.result.concat(NFT2.result), total: NFT1.result.length + NFT2.result.length };
    setUserNFTs(NFTs);
  };

  useEffect(() => {
    if (isInitialized && isWeb3Enabled) {
      fetchNFTsBalance();
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, isWeb3Enabled, account, chainId]);

  return (
    <UserContext.Provider
      value={{
        chainId,
        account,
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
