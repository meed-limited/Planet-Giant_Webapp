import { IS_PRODUCTION } from "../constant/constant";

export const networkConfigs = {
  "0x1": {
    currencySymbol: "ETH",
    blockExplorerUrl: "https://etherscan.io/",
    wrapped: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  },
  "0x5": {
    chainId: 5,
    chainName: "Goerli Test Network",
    currencyName: "ETH",
    currencySymbol: "ETH",
    rpcUrl: "https://goerli.infura.io/v3/",
    blockExplorerUrl: "https://goerli.etherscan.io",
  },
  "0x38": {
    chainId: 56,
    chainName: "Smart Chain",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    blockExplorerUrl: "https://bscscan.com/",
    wrapped: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  "0x61": {
    chainId: 97,
    chainName: "Smart Chain - Testnet",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    blockExplorerUrl: "https://testnet.bscscan.com/",
  },
  "0x89": {
    chainId: 137,
    chainName: "Polygon Mainnet",
    currencyName: "MATIC",
    currencySymbol: "MATIC",
    rpcUrl: "https://rpc-mainnet.maticvigil.com/",
    blockExplorerUrl: "https://polygonscan.com/",
    wrapped: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
  },
  "0x13881": {
    chainId: 80001,
    chainName: "Mumbai",
    currencyName: "MATIC",
    currencySymbol: "MATIC",
    rpcUrl: "https://rpc-mumbai.matic.today/",
    blockExplorerUrl: "https://mumbai.polygonscan.com/",
  },
  "0x19": {
    chainId: 25,
    chainName: "Cronos",
    currencyName: "CRO",
    currencySymbol: "CRO",
    rpcUrl: "https://evm.cronos.org",
    blockExplorerUrl: "https://cronoscan.com/",
  },
  "0x152": {
    chainId: 338,
    chainName: "Cronos testnet",
    currencyName: "TCRO",
    currencySymbol: "TCRO",
    rpcUrl: "https://evm-t3.cronos.org",
    blockExplorerUrl: "https://testnet.cronoscan.com/",
  },
};

export const getExplorer = (chain) => networkConfigs[chain]?.blockExplorerUrl;

export const getExplorerByBridge = (chain) => {
  if (chain === "ETH") {
    if (IS_PRODUCTION) return getExplorer("0x1");
    else return getExplorer("0x5");
  } else if (chain === "BSC") {
    if (IS_PRODUCTION) return getExplorer("0x38");
    else return getExplorer("0x61");
  }
};
