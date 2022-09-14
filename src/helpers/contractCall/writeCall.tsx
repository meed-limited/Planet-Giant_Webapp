import React from "react";
import { Moralis } from "moralis-v1";
import { marketplace_ABI_Json, setApprovalForAll_ABI } from "../../constant/abi";
import { getExplorer } from "../networks";
import { openNotification } from "../notifications";
import { FileSearchOutlined } from "@ant-design/icons";

/* Allow a user to easily transfer an NFT:
 *****************************************/
export const transferNft = async (
  chainId: string | null,
  nft: NFTinDB,
  amount: string | undefined,
  receiver: string
): Promise<Receipt> => {
  let transferReceipt: Receipt;

  const options: TransferOptions = {
    type: nft?.contract_type?.toLowerCase(),
    tokenId: nft?.token_id,
    receiver,
    contractAddress: nft?.token_address,
    amount: nft?.contract_type?.toLowerCase() === "erc1155" ? amount ?? nft.amount : undefined,
  };

  try {
    const tx: any = await Moralis.transfer(options);
    await tx.wait();
    const link = `${getExplorer(chainId)}tx/${tx.hash}`;
    transferReceipt = { isSuccess: true, txHash: tx.hash, link: link };
    const title = "Transfer success";
    openNotification("success", title, <ReceiptMessage id={nft.token_id} link={link} />);
    console.log("Transfer success", tx);
  } catch (e) {
    const title = "Transfer denied";
    const msg = "Something went wrong, please try again.";
    openNotification("error", title, msg);
    console.log(e);
    transferReceipt = { isSuccess: false };
  }
  return transferReceipt;
};

// Approve a whole NFT collection (work for both ERC721 && ERC1155)
export const approveNFTcontract = async (NFTaddress: string, contractAddress: string) => {
  const sendOptions = {
    contractAddress: NFTaddress,
    functionName: "setApprovalForAll",
    abi: setApprovalForAll_ABI,
    params: {
      operator: contractAddress,
      _approved: true,
    },
  };

  try {
    const transaction: any = await Moralis.executeFunction(sendOptions);
    await transaction.wait();
    const title = "NFT Approval set";
    const msg = "The allowance for your NFTs collection has been set.";
    openNotification("success", title, msg);
    console.log("NFTs Approval set");
  } catch (error) {
    const title = "NFT Approval denied";
    const msg = "Something went wrong, the allowance hasn't been set.";
    openNotification("error", title, msg);
    console.log(error);
  }
};

// List pack for sale on the MarketPlace
export const listOnMarketPlace = async (nft: NFTinDB, listPrice: number, contractAddress: string) => {
  let response;
  const p = listPrice * 10 ** 18;
  const sendOptions = {
    contractAddress: contractAddress,
    functionName: "createMarketItem",
    abi: marketplace_ABI_Json,
    params: {
      nftContract: nft.token_address,
      tokenId: nft.token_id,
      price: String(p),
    },
  };

  try {
    const tx: any = await Moralis.executeFunction(sendOptions);
    const receipt = await tx.wait();
    const itemId = filterEvents(receipt.events);

    const title = "NFTs listed succesfully";
    const msg = "Your NFT has been succesfully listed to the marketplace.";
    openNotification("success", title, msg);
    console.log("NFTs listed succesfully");
    response = { success: true, data: itemId };
  } catch (error) {
    const title = "Error during listing!";
    const msg = "Something went wrong while listing your NFT to the marketplace. Please try again.";
    openNotification("error", title, msg);
    console.log(error);
    response = { success: false };
  }
  return response;
};

const filterEvents = (receipt: any[]) => {
  const event = receipt.filter((ev) => ev.event === "MarketItemCreated");
  const item = parseInt(event[0].args.itemId.toString());
  return item;
};

// Buy NFT from the MarketPlace
export const buyNFT = async (tokenAdd: string, marketAddress: string, nft: NFTinDB) => {
  let isSuccess;
  const itemID = nft.itemId;
  const tokenPrice = nft.price! * 10 ** 18;

  const sendOptions = {
    contractAddress: marketAddress,
    functionName: "createMarketSale",
    abi: marketplace_ABI_Json,
    params: {
      nftContract: tokenAdd,
      itemId: itemID,
    },
    msgValue: tokenPrice.toString(),
  };

  try {
    const transaction: any = await Moralis.executeFunction(sendOptions);
    await transaction.wait();
    const title = "NFT bought succesfully";
    const msg = "Your NFT has been succesfully purchased from the marketplace.";
    openNotification("success", title, msg);
    isSuccess = true;
  } catch (error) {
    const title = "Error during purchase!";
    const msg = "Something went wrong while purchasing your NFT From the marketplace. Please try again.";
    openNotification("error", title, msg);
    isSuccess = false;
  }
  return isSuccess;
};

interface Props {
  id: string;
  link: string;
}

const ReceiptMessage: React.FC<Props> = ({ id, link }) => {
  return (
    <>
      Your NFT {id} has been transferred succesfully!
      <br></br>
      <a href={link} target="_blank" rel="noreferrer noopener">
        View in explorer: &nbsp;
        <FileSearchOutlined style={{ transform: "scale(1.3)", color: "purple" }} />
      </a>
    </>
  );
};
