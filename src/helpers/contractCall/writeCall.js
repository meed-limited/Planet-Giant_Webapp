import { Moralis } from "moralis";
import { marketplace_ABI_Json } from "constant/abi";
import { getExplorer } from "../networks";
import { openNotification } from "../notifications";
import { FileSearchOutlined } from "@ant-design/icons";

// import { IS_PRODUCTION, MARKETPLACE, NFT, TEST_MARKETPLACE, TEST_NFT } from "constant/constant";

// const nftAddress = IS_PRODUCTION ? NFT : TEST_NFT;
// const marketAddress = IS_PRODUCTION ? MARKETPLACE : TEST_MARKETPLACE;

/* Allow a user to easily transfer an NFT:
 *****************************************/
export const transferNft = async (chainId, nft, amount, receiver) => {
  var transferReceipt;
  const options = {
    type: nft?.contract_type?.toLowerCase(),
    tokenId: nft?.token_id,
    receiver,
    contractAddress: nft?.token_address,
  };

  if (options.type === "erc1155") {
    options.amount = amount ?? nft.amount;
  }

  try {
    const tx = await Moralis.transfer(options);
    await tx.wait();
    let link = `${getExplorer(chainId)}tx/${tx.hash}`;
    transferReceipt = { isSuccess: true, txHash: tx.hash, link: link };
    let title = "Transfer success";
    let msg = (
      <>
        Your NFT {nft.token_id} has been transferred succesfully!
        <br></br>
        <a href={link} target="_blank" rel="noreferrer noopener">
          View in explorer: &nbsp;
          <FileSearchOutlined style={{ transform: "scale(1.3)", color: "purple" }} />
        </a>
      </>
    );

    openNotification("success", title, msg);
    console.log("Transfer success", tx);
  } catch (e) {
    let title = "Transfer denied";
    let msg = "Something went wrong, please try again.";
    openNotification("error", title, msg);
    console.log(e);
    transferReceipt = { isSuccess: false };
  }
  return transferReceipt;
};

// Approve a whole NFT collection (work for both ERC721 && ERC1155)
export const approveNFTcontract = async (NFTaddress, contractAddress) => {
  const sendOptions = {
    contractAddress: NFTaddress,
    functionName: "setApprovalForAll",
    abi: [
      {
        inputs: [
          { internalType: "address", name: "operator", type: "address" },
          { internalType: "bool", name: "_approved", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    params: {
      operator: contractAddress,
      _approved: true,
    },
  };

  try {
    const transaction = await Moralis.executeFunction(sendOptions);
    await transaction.wait();
    let title = "NFT Approval set";
    let msg = "The allowance for your NFTs collection has been set.";
    openNotification("success", title, msg);
    console.log("NFTs Approval set");
  } catch (error) {
    let title = "NFT Approval denied";
    let msg = "Something went wrong, the allowance hasn't been set.";
    openNotification("error", title, msg);
    console.log(error);
  }
};

// List pack for sale on the MarketPlace
export const listOnMarketPlace = async (nft, listPrice, contractAddress) => {
  var isSuccess;
  const p = listPrice * ("1e" + 18);
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
    const transaction = await Moralis.executeFunction(sendOptions);
    await transaction.wait();

    let title = "NFTs listed succesfully";
    let msg = "Your NFT has been succesfully listed to the marketplace.";
    openNotification("success", title, msg);
    console.log("NFTs listed succesfully");
    isSuccess = true;
  } catch (error) {
    let title = "Error during listing!";
    let msg = "Something went wrong while listing your NFT to the marketplace. Please try again.";
    openNotification("error", title, msg);
    console.log(error);
    isSuccess = false;
  }
  return isSuccess;
};

// Buy NFT from the MarketPlace
export const buyNFT = async (tokenAdd, marketAddress, tokenDetails) => {
  var isSuccess;
  const itemID = tokenDetails.itemId;
  const tokenPrice = tokenDetails.price;

  const sendOptions = {
    contractAddress: marketAddress,
    functionName: "createMarketSale",
    abi: marketplace_ABI_Json,
    params: {
      nftContract: tokenAdd,
      itemId: itemID,
    },
    msgValue: tokenPrice,
  };

  try {
    const transaction = await Moralis.executeFunction(sendOptions);
    await transaction.wait();
    let title = "NFT bought succesfully";
    let msg = "Your NFT has been succesfully purchased from the marketplace.";
    openNotification("success", title, msg);
    isSuccess = true;
  } catch (error) {
    let title = "Error during purchase!";
    let msg = "Something went wrong while purchasing your NFT From the marketplace. Please try again.";
    openNotification("error", title, msg);
    isSuccess = false;
  }
  return isSuccess;
};
