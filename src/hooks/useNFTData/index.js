import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import useSelloChainedCO2 from "../useSelloChainedCO2";
// TODO refactorizar o rehacer este hook
const getData = async ({SelloChainedCO2,tokenId}) =>{
  let tokenURI = await SelloChainedCO2.methods.tokenURI(tokenId).call();
  console.log({tokenURI});
  const response = await fetch(tokenURI);
  const metadata = await response.json();
  console.log({metadata});
  return{tokenId, ...metadata} 
}

const useNFTsData = ({ owner = null } = {}) => {
  const [NFTs, setNFTs] = useState([]);
  const { library } = useWeb3React();
  const [loading, setLoading] = useState(true);
  const SelloChainedCO2 = useSelloChainedCO2();

  const update = useCallback(async () => {
    if (SelloChainedCO2) {
      setLoading(true);

      let tokenIds;
      console.log('Tiene NFTs: '+(library.utils.isAddress(owner)))
      if (library.utils.isAddress(owner)) {
      const balanceOf = await SelloChainedCO2.methods.balanceOf(owner).call();
      const tokenIdsOfOwner = new Array(Number(balanceOf))
        .fill()
        .map((_, index) =>
          SelloChainedCO2.methods.ownerToToken(owner).call()
        );
      tokenIds = await Promise.all(tokenIdsOfOwner);
      console.log({tokenIds})
      const metadataPromise = tokenIds.map((tokenId) =>
        getData({ tokenId, SelloChainedCO2 })
      );
      const NFT = await Promise.all(metadataPromise);
      setNFTs(NFT);
      console.log({NFT})
      setLoading(false);
      }
    }
  }, [SelloChainedCO2, owner, library?.utils]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    NFTs,
    update,
  };
};

export { useNFTsData };