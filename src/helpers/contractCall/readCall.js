import { IS_PRODUCTION, MARKETPLACE, NFT, TEST_MARKETPLACE, TEST_NFT } from "constant/constant";
import { Moralis } from "moralis";

const nftAddress = IS_PRODUCTION ? NFT : TEST_NFT;
const marketAddress = IS_PRODUCTION ? MARKETPLACE : TEST_MARKETPLACE;

const getSymbolABI = [
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "_symbol", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
];

const checkApprovalABI = [
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];

/* Get the name of a specific NFT :
 ************************************/
export const getTokenName = async (contractAddress) => {
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
  }
};

/* Get the name of a specific NFT :
 ************************************/
export const checkNftApproval = async (owner) => {
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
  }
};
