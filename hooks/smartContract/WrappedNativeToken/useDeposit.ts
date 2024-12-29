// // <---! IMPORT !---> //
// import getABI from "@/contracts/utils/getAbi.util";
// import { decodeErrorResult, TransactionReceipt, parseEther } from "viem";
// import {
//   useSimulateContract,
//   useTransactionConfirmations,
//   useWaitForTransactionReceipt,
//   useWriteContract,
// } from "wagmi";
// import { useWriteContractCallbacks } from "@/hooks/smartContract/useWriteContractCallbacks";
// import { useEffect } from "react";
// // <---! IMPORT !---> //

// type Props = {
//   chainId?: number;
//   // <---! CONTRACT PROPS IN ABI STARTS HERE !---> //
//   value?: bigint;
//   // <---! CONTRACT PROPS IN ABI ENDS HERE !---> //
//   enabled?: boolean;
//   onSuccess?: (data: TransactionReceipt) => void;
//   onSettled?: (data?: TransactionReceipt) => void;
//   onError?: (error?: Error) => void;
// };

// export const useDeposit = ({
//   chainId,
//   value,
//   enabled,
//   onSuccess,
//   onSettled,
//   onError,
// }: Props) => {
//   const {
//     data: config,
//     refetch,
//     isLoading: isLoadingPrepare,
//     isError: isErrorPrepare,
//     error: errorPrepare,
//   } = useSimulateContract({
//     chainId,
//     address: getWETHAddress(chainId),
//     abi: getABI("WETH"),
//     // <---! PARAMS IN ABI !---> //
//     args: [],
//     // <---! PARAMS IN ABI !---> //

//     // <---! FUNCTION IN ABI !---> //
//     functionName: "deposit",
//     // <---! FUNCTION IN ABI !---> //
//     query: { enabled: enabled && !!chainId, retry: false },
//     value,
//   });

//   const {
//     writeContractAsync,
//     data: transactionHash,
//     isPending: isLoadingWrite,
//     isError: isErrorWrite,
//     error: errorWrite,
//   } = useWriteContract();

//   const {
//     isFetching: isFetchingReceipt,
//     isLoading: isLoadingReceipt,
//     data: receipt,
//     isFetched,
//     isSuccess,
//     isError: isErrorReceipt,
//     error: errorTransaction,
//   } = useWaitForTransactionReceipt({
//     hash: transactionHash,
//     query: {
//       enabled,
//     },
//   });

//   const {
//     isFetching: isFetchingConfirmation,
//     isLoading: isLoadingConfirmation,
//     isFetched: isFetchedConfirmation,
//     isSuccess: isSuccessConfirmation,
//     isError: isErrorConfirmation,
//     error: errorConfirmation,
//   } = useTransactionConfirmations({
//     hash: transactionHash,
//     query: {
//       enabled,
//     },
//   });

//   useWriteContractCallbacks({
//     receipt,
//     isFetched,
//     isFetchedConfirmation,
//     isSuccessConfirmation,
//     onSuccess: (data: TransactionReceipt, isConfirmed: boolean) => {
//       if (isConfirmed) {
//         console.log("Deposit ETH to WETH confirmed");
//         onSuccess?.(data);
//       } else {
//         console.log(
//           "Deposit ETH to WETH transaction received, awaiting confirmation"
//         );
//       }
//     },
//     onSettled: (data?: TransactionReceipt, isConfirmed?: boolean) => {
//       if (isConfirmed) {
//         console.log("Deposit ETH to WETH process completed");
//         onSettled?.(data);
//       }
//     },
//     onError,
//     error: errorWrite,
//   });

//   const onDepositETH = async () => {
//     console.log("Config: ", config);
//     console.log("Enabled: ", enabled);
//     if (config && enabled) {
//       try {
//         return await writeContractAsync(config.request);
//       } catch (error) {
//         onError?.(
//           errorWrite instanceof Error
//             ? errorWrite
//             : new Error("Something went wrong in onDepositETH async function")
//         );
//       }
//     }
//     return;
//   };

//   const isLoading =
//     isLoadingReceipt ||
//     isLoadingConfirmation ||
//     isLoadingPrepare ||
//     isLoadingWrite ||
//     isFetchingReceipt ||
//     isFetchingConfirmation;

//   const isError =
//     isErrorPrepare || isErrorReceipt || isErrorWrite || isErrorConfirmation;

//   const error =
//     errorWrite || errorTransaction || errorPrepare || errorConfirmation;

//   useEffect(() => {
//     console.log("Error simulating contract deposit(): ", errorPrepare);
//     if (config) console.log("Data: ", config);
//   }, [errorPrepare, config]);

//   return {
//     config,
//     error,
//     errorWrite,
//     isLoading,
//     isSuccess,
//     isSuccessConfirmation,
//     isError,
//     onDepositETH,
//     refetch,
//   };
// };
