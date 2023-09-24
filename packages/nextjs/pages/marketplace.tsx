import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import SvgImage from "~~/components/SvgImage";
import MintedNFTImage from "~~/components/MintedNFTImage";
import deployedContracts from "~~/generated/deployedContracts";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useFetchNounImage } from "~~/hooks/scaffold-eth";

const CHAIN_ID = 84531;

const Marketplace: NextPage = () => {
  const { address } = useAccount();

  const { generateRandomNoun, svgBase64, nextNounId } = useFetchNounImage();

  const [selectedNFT, setSelectNFT] = useState(-1);

  const { data: nfts } = useScaffoldContractRead({
    contractName: "FoodNFT",
    functionName: "getMyNFTs",
    args: [address],
  });

  const { data: foodNfts } = useScaffoldContractRead({
    contractName: "FoodScramble",
    functionName: "getMyFoods",
    args: [address],
  });

  const { writeAsync: mintNFT } = useScaffoldContractWrite({
    contractName: "FoodNFT",
    functionName: "mintChef",
    args: [address, nextNounId.toString()],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: createAccount } = useScaffoldContractWrite({
    contractName: "FoodScramble",
    functionName: "createTokenBoundAccount",
    args: [
      deployedContracts[CHAIN_ID][0].contracts.ERC6551Account.address,
      BigInt("1"),
      deployedContracts[CHAIN_ID][0].contracts.FoodNFT.address,
      BigInt(selectedNFT),
      BigInt("1"),
      "0x",
    ],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
    },
  });

  const viewTBA = () => {
    const chainName = "goerli";
    const url = "https://tokenbound.org/assets/" + chainName + "/" + 
      deployedContracts[CHAIN_ID][0].contracts.FoodNFT.address + "/" + selectedNFT;

      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
  }

  return (
    <>
      <MetaHeader
        title="Marketplace"
        description="Marketplace created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>

      <div className="grid lg:grid-cols-1 gap-8 flex-grow mt-10 px-20">
        <div className="px-5">
          <h1 className="text-center mb-5">
            <span className="block text-3xl mb-2">Select your NFTs</span>
          </h1>

          <div className="flex">
            {nfts?.map((n, index) => (
              <div
                key={index}
                className="w-20 h-20 border border-gray-30 flex items-center justify-center font-bold mr-2 mb-2 cursor-pointer"
                style={{ background: selectedNFT === index ? "#00cc99" : "" }}
                onClick={() => setSelectNFT(index)}
              >
                {/* <Image className="" src="/assets/chef.png" width={50} height={50} alt="Chef" /> */}
                {/* {n.id + " : " + n.tokenURI} */}
                <MintedNFTImage seed={n.tokenURI} />
              </div>
            ))}
          </div>

          <button
            className="w-60 py-2 px-16 mb-10 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
            onClick={() => createAccount()}
            disabled={nfts?.length === 0 || selectedNFT === -1}
          >
            Create Token Bound Account
          </button>

          <button
            className="w-60 py-2 px-16 mb-1 mt-6 ml-52 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
            onClick={() => viewTBA()}
          >
            View TBA
          </button>


          <h1 className="text-center mb-5">
            <span className="block text-2xl mb-2">Mint an NFT</span>
          </h1>

            <div>
            <SvgImage src={svgBase64} />
            </div>

          <button
            className="w-60 py-2 px-16 mb-1 mt-6 ml-52 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
            onClick={() => generateRandomNoun()}
          >
            Randomize
          </button>


          {/* <Image className="ml-60" src="/assets/chef.png" width={80} height={80} alt="Chef" /> */}

          <button
            className="w-60 py-2 px-16 mb-1 mt-6 ml-52 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
            onClick={() => mintNFT()}
          >
            Mint
          </button>
        </div>
        <div>
          {/* <h1 className="text-center mb-5">
            <span className="block text-3xl mb-2">Your Food NFTs</span>
          </h1>

          <div className="flex">
            {foodNfts?.map((n, index) => (
              <div
                key={index}
                className="w-20 h-20 border border-gray-30 flex font-bold bg-white mr-2 mb-2"
              >
                <Image className="" src="/assets/hamburger.png" width={70} height={70} alt="Hamburger" />
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Marketplace;
