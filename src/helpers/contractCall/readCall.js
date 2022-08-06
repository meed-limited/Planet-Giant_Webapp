import { Moralis } from "moralis";

const getSymbolABI = [
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "_symbol", type: "string" }],
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
