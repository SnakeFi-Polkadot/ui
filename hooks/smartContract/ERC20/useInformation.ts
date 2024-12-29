// <---! IMPORT !---> //
import { config as wagmiConfig } from "@/configs/wagmi.config";
import getABI from "@/contracts/utils/getAbi.util";
import { useEffect } from "react";
import { TransactionReceipt } from "viem";
import { useReadContract, useReadContracts } from "wagmi";
// <---! IMPORT !---> //

type Props = {
  chainId?: number;
  // <---! CONTRACT PROPS IN ABI STARTS HERE !---> //
  tokenAddress: `0x${string}`;
  // <---! CONTRACT PROPS IN ABI ENDS HERE !---> //
  enabled?: boolean;
  onSuccess?: (data: TransactionReceipt) => void;
  onSettled?: (data?: TransactionReceipt) => void;
  onError?: (error?: Error) => void;
};

export const useInformation = ({ chainId, tokenAddress, enabled }: Props) => {
  const isEnabled = !!enabled || !!chainId;

  // const {
  //   data: information,
  //   isLoading,
  //   isFetching,
  //   isError,
  //   isSuccess,
  //   refetch: refetchInformation,
  //   error,
  // } = useReadContract({
  //   config: wagmiConfig,
  //   chainId,
  //   address: enabled ? tokenAddress : undefined,
  //   abi: getABI("ERC20"),
  //   functionName: "name",
  //   query: { enabled: isEnabled },
  // });

  const {
    data: information,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    refetch: refetchInformation,
    error,
  } = useReadContracts({
    contracts: [
      {
        chainId,
        address: enabled ? tokenAddress : undefined,
        abi: getABI("ERC20"),
        functionName: "name",
      },
      {
        chainId,
        address: enabled ? tokenAddress : undefined,
        abi: getABI("ERC20"),
        functionName: "symbol",
      },
      {
        chainId,
        address: enabled ? tokenAddress : undefined,
        abi: getABI("ERC20"),
        functionName: "decimals",
      },
    ],
    query: { enabled: isEnabled },
  });

  const refetch = enabled ? refetchInformation : undefined;

  return {
    isLoading,
    isFetching,
    isSuccess,
    isError,
    information,
    refetch,
  };
};
