'use client';
import BalanceToken from '@/components/swap/balance-token';
import TokenInput from '@/components/liquidity/create/token-input';
import { useTokenBalance } from '@/hooks/smartContract/ERC20/useTokenBalance';
import { cn } from '@/lib/utils'
import { Token } from '@/utils/types.util';
import React, { useState } from 'react'
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ButtonGroup, ButtonGroupItem } from '@/components/custom-ui/icon-radio-button';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CreateLiquidityInputProps {
    className?: string;
}

const CreateLiquidityInput = ({ className }: CreateLiquidityInputProps) => {
    const { chainId, address } = useAccount();

    const [token0, setToken0] = useState<{
        token: Token | undefined;
        value: number;
    }>({ token: undefined, value: 0 });
    const [token1, setToken1] = useState<{
        token: Token | undefined;
        value: number;
    }>({ token: undefined, value: 0 });

    const { balance: token0Balance, isFetching: token0IsFetching, isLoading: token0IsLoading, isSuccess: token0IsSuccess, isError: token0IsError, refetch: token0Refetch } = useTokenBalance({
        chainId,
        tokenAddress: token0.token?.address as `0x${string}`,
        ownerAddress: address!,
        enabled: !!token0
    });

    const { balance: token1Balance, isFetching: token1IsFetching, isLoading: token1IsLoading, isSuccess: token1IsSuccess, isError: token1IsError, refetch: token1Refetch } = useTokenBalance({
        chainId,
        tokenAddress: token1.token?.address as `0x${string}`,
        ownerAddress: address!,
        enabled: !!token1
    });

    return (
        <div className={cn(
            "flex flex-col gap-7 p-5 border-2 border-primary rounded-xl text-sm font-extralight",
            className
        )}>
            <div className="w-full h-auto">
                <BalanceToken balance={token0 && token0Balance ? formatEther(token0Balance as any) : "0.00"} />
                <TokenInput
                    token={token0.token}
                    selectToken={(token) => setToken0({ token, value: token0.value })}
                    className='h-14 w-full'
                    placeHolder='0.00'
                    inputStyles='focus-visible:ring-offset-0 focus-visible:ring-0 border-0 w-full'
                    inputValue={token0.value}
                    setInputValue={(value) => setToken0({ token: token0.token, value })}
                />
            </div>
            <div className="w-full h-auto">
                <BalanceToken balance={token0 && token0Balance ? formatEther(token0Balance as any) : "0.00"} />
                <TokenInput
                    token={token1.token}
                    selectToken={(token) => setToken0({ token, value: token1.value })}
                    className='h-14 w-full'
                    placeHolder='0.00'
                    inputStyles='focus-visible:ring-offset-0 focus-visible:ring-0 border-0 w-full'
                    inputValue={token1.value}
                    setInputValue={(value) => setToken0({ token: token1.token, value })}
                />
            </div>
            <div className="flex flex-col justify-center gap-2">
                <span className="text-sm font-light">Pool type</span>
                {/* <RadioGroup defaultValue="option-volatile" className='border-2 border-foreground rounded-xl' orientation=''>
                    <div className="flex items-center space-x-2 border-b-2 border-foreground w-full p-2 hover: ">
                        <RadioGroupItem value="option-volatile" id="option-volatile" className='text-black bg-white' />
                        <Label htmlFor="option-volatile">Volatile</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-stable" id="option-stable" />
                        <Label htmlFor="option-stable">Stable</Label>
                    </div>
                </RadioGroup> */}
                <ButtonGroup orientation='vertical' defaultValue='volatile' className='w-full grid grid-cols-2'>
                    <ButtonGroupItem label='Volatile' checkIcon value={'volatile'} className='col-span-1' />
                    <ButtonGroupItem label='Stable' checkIcon value={'stable'} className='col-span-1' />
                </ButtonGroup>
            </div>
            <div className="flex flex-col justify-center gap-2">
                <span className="text-sm font-light">Slippage</span>
                <Input />
            </div>

            <div className="flex flex-col justify-center gap-2 w-full">
                <Button
                    variant={"secondary"}
                    className='text-primary'
                >Create Liquidity</Button>
            </div>
        </div>
    )
}

export default CreateLiquidityInput