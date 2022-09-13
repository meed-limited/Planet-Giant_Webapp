/// <reference types="react-scripts" />

type NFTinDB = {
  amount: string;
  block_number: string;
  block_number_minted: string;
  contract_type: string;
  image: string;
  last_metadata_sync: string;
  last_token_uri_sync: string;
  metadata: NftAttributes;
  name: string;
  owner_of: string;
  symbol: any;
  synced_at: any;
  token_address: string;
  token_hash: string;
  token_id: string;
  tokenId?: string;
  token_uri: string;
  price?: any;
};

interface NftAttributes {
  image: string;
  name: string;
  description: string;
  attributes: Attributes;
}
