import { useMoralis } from "react-moralis";

export const useMoralisDb = () => {
  const { Moralis, chainId, account } = useMoralis();

  const getMarketItemData = async () => {
    const CreatedMarketItems = Moralis.Object.extend("CreatedMarketItems");
    const query = new Moralis.Query(CreatedMarketItems);
    const res = await query.find();
    return res;
  };

  const parseAllData = async (res) => {
    const parsedData = await JSON.parse(JSON.stringify(res));
    return parsedData;
  };

  const parseData = async (res, owner) => {
    const parsedData = await JSON.parse(JSON.stringify(res)).filter((item) => item.owner === owner);
    return parsedData;
  };

  const addItemImage = (nftToSend) => {
    const ItemImage = Moralis.Object.extend("ItemImages");
    const itemImage = new ItemImage();
    itemImage.set("image", nftToSend.image);
    itemImage.set("nftContract", nftToSend.token_address);
    itemImage.set("tokenId", nftToSend.token_id);
    itemImage.set("name", nftToSend.name);
    itemImage.save();
  };

  const saveMarketItemInDB = async (nft, listPrice, itemId) => {
    const CreatedMarketItem = Moralis.Object.extend("CreatedMarketItems");
    const item = new CreatedMarketItem();

    item.set("chainId", chainId);
    item.set("amount", nft.amount);
    item.set("seller", account);
    item.set("block_number", nft.block_number);
    item.set("block_number_minted", nft.block_number_minted);
    item.set("contract_type", nft.contract_type);
    item.set("image", nft.image);
    item.set("last_metadata_sync", nft.last_metadata_sync);
    item.set("last_token_uri_sync", nft.last_token_uri_sync);
    item.set("metadata", nft.metadata);
    item.set("collectionName", nft.name);
    item.set("owner", nft.owner_of);
    item.set("itemId", itemId);
    item.set("symbol", nft.symbol);
    item.set("synced_at", nft.synced_at);
    item.set("token_address", nft.token_address);
    item.set("token_hash", nft.token_hash);
    item.set("tokenId", nft.token_id);
    item.set("token_uri", nft.token_uri);
    item.set("sold", false);
    item.set("price", listPrice);
    item.save();
  };

  return {
    getMarketItemData,
    parseAllData,
    parseData,
    addItemImage,
    saveMarketItemInDB,
  };
};
