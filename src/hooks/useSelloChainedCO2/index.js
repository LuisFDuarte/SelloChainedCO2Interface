import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import SelloChainedCO2 from "../../config/web3/artifacts/SelloChainedCO2";

const { address, abi } = SelloChainedCO2;

const useSelloChainedCO2 = () => {
  const { active, library, chainId } = useWeb3React();

  const selloChainedCO2 = useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId]);
  }, [active, chainId, library?.eth?.Contract]);

  return selloChainedCO2;
};

export default useSelloChainedCO2;