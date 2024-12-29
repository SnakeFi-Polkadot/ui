'use client';
import React, { useState } from 'react'
import SwapSetting from './swapSetting';
import TokenInput from './tokenInput';
import { Token } from '@/utils/types.util';
import BalanceToken from './balanceToken';
import { useTokenBalance } from '@/hooks/smartContract/ERC20/useTokenBalance';
import { useAccount } from 'wagmi';
import { formatEther } from 'viem';
import { ArrowDownUpIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '@radix-ui/react-dropdown-menu';

interface SwapPanelProps {

}

const SwapPanel = ({ }: SwapPanelProps) => {
    const { address, chainId } = useAccount();
    const [fromToken, setFromToken] = useState<Token | undefined>(undefined);
    const [toToken, setToToken] = useState<Token | undefined>(undefined);

    const [fromTokenValue, setFromTokenValue] = useState<number | undefined>(undefined);
    const [toTokenValue, setToTokenValue] = useState<number | undefined>(undefined);

    const { balance: fromTokenBalance, isFetching: fromTokenIsFetching, isLoading: fromTokenIsLoading, isSuccess: fromTokenIsSuccess, isError: fromTokenIsError, refetch: fromTokenRefetch } = useTokenBalance({
        chainId,
        tokenAddress: fromToken?.address as `0x${string}`,
        ownerAddress: address!,
        enabled: !!fromToken
    });

    const { balance: toTokenBalance, isFetching: toTokenIsFetching, isLoading: toTokenIsLoading, isSuccess: toTokenIsSuccess, isError: toTokenIsError, refetch: toTokenRefetch } = useTokenBalance({
        chainId,
        tokenAddress: toToken?.address as `0x${string}`,
        ownerAddress: address!,
        enabled: !!toToken
    });

    return (
        <div className="bg-background flex flex-col justify-start items-center gap-4 rounded-xl border-double border-4 border-primary w-[540px] h-[500px] self-center p-4">
            <SwapSetting />
            <div className="w-full h-auto">
                <BalanceToken balance={fromTokenBalance ? formatEther(fromTokenBalance as any) : "0.00"} />
                <TokenInput
                    fromToken={fromToken}
                    toToken={toToken}
                    selectFromToken={setFromToken}
                    selectToToken={setToToken}
                    className='h-14 w-full'
                    placeHolder='0.00'
                    inputStyles='focus-visible:ring-offset-0 focus-visible:ring-0 border-0'
                    inputValue={fromTokenValue}
                    setInputValue={setFromTokenValue}
                    isFrom={true}
                />
            </div>
            <div className="max-h-[40px] w-full flex items-center justify-center">
                <Button
                    className="h-full p-5 self-center justify-items-center bg-background text-primary hover:bg-primary hover:text-background transition-all duration-300 ease-linear"
                    onClick={() => {
                        const temp = fromToken;
                        setFromToken(toToken);
                        setToToken(temp);
                        const tempValue = fromTokenValue;
                        setFromTokenValue(toTokenValue);
                        setToTokenValue(tempValue);
                    }}
                >
                    <ArrowDownUpIcon size={30} />
                </Button>
            </div>
            <div className="w-full h-auto">
                <BalanceToken balance={toTokenBalance ? formatEther(toTokenBalance as any) : "0.00"} />
                <TokenInput
                    fromToken={fromToken}
                    toToken={toToken}
                    selectFromToken={setFromToken}
                    selectToToken={setToToken}
                    placeHolder='0.00'
                    className='h-14 w-full'
                    inputStyles='focus-visible:ring-offset-0 focus-visible:ring-0 border-0'
                    inputValue={toTokenValue}
                    setInputValue={setToTokenValue}
                    isFrom={false}
                />
            </div>
            <div className="flex flex-col justify-center items-center p-5 w-full gap-2">
                <span className='w-full text-sm font-medium text-secondary'>Price Information:</span>
                <Separator className='w-full h-[1px] bg-primary' />
                <div className="flex flex-row items-center justify-around w-full">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-base font-bold">1.00</span>
                        <span className='text-sm font-light'>{fromToken ? fromToken.symbol : "..."} per {toToken ? toToken.symbol : "..."}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-base font-bold">1.00</span>
                        <span className='text-sm font-light'>{toToken ? toToken.symbol : "..."} per {fromToken ? fromToken.symbol : "..."}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-base font-bold">1.00%</span>
                        <span className='text-xs font-light'>Price impact</span>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <Button disabled={!fromToken || !toToken} variant={"default"} className="bg-secondary text-black hover:bg-secondary/70 w-full h-14 transition-all duration-400 hover:opacity-75">Swap</Button>
            </div>
        </div>
    )
}

export default SwapPanel