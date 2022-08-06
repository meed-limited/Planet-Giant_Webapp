import { Moralis } from "moralis";
import { getExplorer } from "../networks";
import { openNotification } from "../notifications";
import { FileSearchOutlined } from "@ant-design/icons";

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
