/// <reference types="react-scripts" />

type NFTinDB = {
  amount: string;
  block_number: string;
  block_number_minted: string;
  chainId?: string;
  collectionName?: string;
  contract_type: string;
  createdAt?: string;
  image: string;
  itemId?: number | undefined;
  last_metadata_sync: string;
  last_token_uri_sync: string;
  metadata: NftAttributes;
  objectId?: string;
  owner: string;
  name: string;
  owner_of: string;
  price?: number;
  seller?: string;
  sold?: boolean;
  symbol?: string;
  synced_at: string;
  tokenId?: string;
  token_address: string;
  token_hash: string;
  token_id: string;
  token_uri: string;
  updatedAt: string;
};

interface NftAttributes {
  image: string;
  name: string;
  description: string;
  attributes: Attributes;
}

interface UserNfts {
  result: {
    token_address: string;
    token_id: string;
    token_hash: string;
    contract_type: string;
    owner_of: string;
    block_number: string;
    block_number_minted: string;
    token_uri?: string | undefined;
    metadata?: string | undefined;
    name: string;
    amount?: string;
    image?: string;
    symbol?: string;
    last_token_uri_sync: string;
    last_metadata_sync: string;
  }[];
  total: number;
}

interface Receipt {
  isSuccess: boolean;
  txHash?: string;
  link?: string;
}

interface TransferOptions {
  type: TransferType | undefined;
  tokenId: string;
  receiver: string;
  contractAddress: string;
  amount: string | undefined;
}
