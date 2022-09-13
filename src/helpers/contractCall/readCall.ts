import { Moralis } from "moralis-v1";
import { checkApprovalABI, getSymbolABI } from "../../constant/abi";
import { getMarketplaceAddress, getNftAddress } from "../../constant/constant";

const nftAddress = getNftAddress();
const marketAddress = getMarketplaceAddress();

/* Get the name of a specific NFT :
 ************************************/
export const getTokenName = async (contractAddress: string) => {
  const readOptions = {
    contractAddress: contractAddress,
    functionName: "symbol",
    abi: getSymbolABI,
    params: {},
  };

  try {
    const data = await Moralis.executeFunction(readOptions);
    if (data !== undefined) {
      return data;
    } else return undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

/* Get the name of a specific NFT :
 ************************************/
export const checkNftApproval = async (owner: string) => {
  const readOptions = {
    contractAddress: nftAddress,
    functionName: "isApprovedForAll",
    abi: checkApprovalABI,
    params: {
      owner: owner,
      operator: marketAddress,
    },
  };

  try {
    const data = await Moralis.executeFunction(readOptions);
    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
