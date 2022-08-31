import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export const useCoingeckoAPI = (token) => {
  const { isInitialized, chainId, account } = useMoralis();
  const [price, setPrice] = useState();
  const getTokenPrice = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${token}&vs_currencies=usd`;

  useEffect(() => {
    fetch(getTokenPrice)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        let result = data[token].usd;
        setPrice(result);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, chainId, account]);

  return { price };
};
