import { SMART_CONTRACT_ADDRESS } from "@/contracts/utils/common.util";

export const getContractAddress = (
  contractName: any,
  networkId: any
): `0x${string}` => {
  return contractName[networkId];
};

export const getWWNDAddress = (networkId: any): `0x${string}` => {
  return getContractAddress(SMART_CONTRACT_ADDRESS.WWND, networkId);
};
