'use client';
import React, { useEffect, useState } from 'react'
import SwapSetting from './swapSetting';
import TokenInput from './tokenInput';
import { Token } from '@/utils/types.util';
import BalanceToken from './balanceToken';
import { useTokenBalance } from '@/hooks/smartContract/ERC20/useTokenBalance';
import { useAccount } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { ArrowDownUpIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '@radix-ui/react-dropdown-menu';
import SwapDialog from './swapDialog';

interface SwapPanelProps {

}

const SwapPanel = ({ }: SwapPanelProps) => {
    const { address, chainId } = useAccount();
    const [swapLoading, setSwapLoading] = useState<boolean>(true);
    const [fromToken, setFromToken] = useState<Token | undefined>(undefined);
    const [toToken, setToToken] = useState<Token | undefined>(undefined);

    const [fromTokenValue, setFromTokenValue] = useState<number | undefined>(undefined);
    const [toTokenValue, setToTokenValue] = useState<number | undefined>(undefined);

    const [settings, setSettings] = useState<{
        slippage: number,
        approveInfinity: boolean
    }>({
        slippage: 0.5,
        approveInfinity: false
    });

    const [minOutputValue, setMinOutputValue] = useState<bigint | undefined>(undefined);

    // const [reserve0, setReserve0] = useState<bigint>(0n);
    // const [reserve1, setReserve1] = useState<bigint>(0n);

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

    const calculateOutputValue = (input: bigint, reserve0: bigint, reserve1: bigint) => {
        return input * reserve1 / reserve0;
    }

    useEffect(() => {
        setSwapLoading(true);
        if (!fromToken || !toToken || !fromTokenValue) {
            if (fromTokenValue == 0) {
                setToTokenValue(0);
            }
            setSwapLoading(false);
            return;
        }
        const outputValue = calculateOutputValue(parseEther(fromTokenValue?.toString()), parseEther('10'), parseEther('25'));
        setToTokenValue(Number(formatEther(outputValue)));
        const minOutput = Number(outputValue) * settings.slippage;
        setMinOutputValue(BigInt(minOutput));
        setSwapLoading(false);
    }, [fromToken, toToken, fromTokenValue, settings])

    return (
        <div className="bg-primary flex flex-col justify-start items-center gap-4 rounded-xl border-double border-4 border-primary w-[540px] h-auto self-center p-4">
            <SwapSetting settings={settings} setSettings={setSettings} />
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
                    className="h-full self-center justify-items-center bg-inherit text-secondary group"
                    onClick={() => {
                        if (!fromToken && !toToken) {
                            return;
                        }
                        const temp = fromToken;
                        setFromToken(toToken);
                        setToToken(temp);
                        const tempValue = fromTokenValue;
                        setFromTokenValue(toTokenValue);
                        setToTokenValue(tempValue);
                    }}
                >
                    <ArrowDownUpIcon size={20} className='group-active:scale-150 transition-all duration-300 ease-linear' />
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
                <SwapDialog
                    disabled={!fromToken || !toToken || !fromTokenValue || !toTokenValue}
                    loading={swapLoading}
                />
            </div>
        </div>
    )
}

export default SwapPanel