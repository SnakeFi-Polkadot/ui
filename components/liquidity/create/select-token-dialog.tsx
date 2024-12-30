'use client';
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Token } from '@/utils/types.util';
import Image from 'next/image';
import useDebounce from '@/hooks/useDebounce';
import { useInformation } from '@/hooks/smartContract/ERC20/useInformation';
import { useAccount } from 'wagmi';
import { getWWNDAddress } from '@/contracts/utils/getAddress.util';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/loadingSpinner';
import { Separator } from '@/components/ui/separator';


interface SelectTokenDialogProps {
    selectToken: (token: Token | undefined) => void;
    token?: Token;
}

const hotTokens: Token[] = [
    {
        address: "0x0000000000000000000000000000000000000000",
        symbol: 'WND',
        name: 'Westend Token',
        decimals: 18,
        logoURI: '/images/polkadot_token_logo.png',
        type: 'native',
    },
    {
        address: '0xa',
        symbol: 'WWND',
        name: 'Wrapped Westend Token',
        decimals: 18,
        logoURI: '/images/polkadot_token_logo.png',
        type: 'wrapped',
    },
    {
        address: '0xb',
        symbol: 'ETH',
        name: 'Ethereum',
        decimals: 18,
        logoURI: '/images/polkadot_token_grey_logo.png',
        type: 'normal',
    }
];

const SelectTokenDialog = ({ token, selectToken }: SelectTokenDialogProps) => {
    const { chainId, address } = useAccount();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchAddress, setSearchAddress] = useState<string>('');
    const [filteredTokens, setFilteredTokens] = useState<Token[] | null>(hotTokens);
    const { information, isError: informationIsError, isFetching: informationIsFetching, isLoading: informationIsLoading, isSuccess: informationIsSuccess, refetch: informationRefetch } = useInformation({
        chainId,
        tokenAddress: searchAddress as any,
        enabled: searchAddress !== '',
    });
    const [open, setOpen] = useState<boolean>(false);

    useDebounce(() => {
        if (searchAddress === '') {
            setFilteredTokens(hotTokens);
        } else {
            setFilteredTokens(informationIsSuccess ? [{
                address: searchAddress,
                name: information?.[0].status == 'success' ? information?.[0].result as any : 'Unknown Token',
                symbol: information?.[1].status == 'success' ? information?.[1].result as any : 'UNK',
                decimals: information?.[2].status == 'success' ? information?.[2].result as any : 18,
                type: searchAddress == getWWNDAddress(chainId) ? 'wrapped' : 'normal',
                logoURI: '/images/polkadot_token_grey_logo.png',
            }] : []);
        }
    }, [searchAddress], 500);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={`bg-background w-auto flex flex-row items-center ${token ? "justify-between" : "justify-center"} pl-0 hover:bg-background/90 hover:text-secondary/70 active:scale-95 duration-150 ease-linear transition-all`}>
                    {token ?
                        <>
                            <Image
                                src={(token.logoURI) || "/images/polkadot_token_logo.png"}
                                alt={(token.address) || ""}
                                width={50}
                                height={50}
                            />
                            <span className='text-sm font-medium'>{token.symbol}</span>
                        </>
                        : <span className='text-sm font-medium'>Select a token</span>}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader />
                <div className='min-h-[480px] flex flex-col items-center gap-5'>
                    <Input placeholder='Search token' className="ring-0 border-2 focus-visible:ring-offset-0 focus-visible:ring-0" />
                    {
                        loading
                            ? <LoadingSpinner />
                            :
                            <div className='flex flex-col justify-center gap-2 w-full'>
                                {
                                    filteredTokens?.map((filteredToken, index) => {
                                        return <>
                                            <Button
                                                key={index}
                                                onClick={() => {
                                                    selectToken(token);
                                                    setOpen(false);
                                                }}
                                                className='flex flex-row items-center justify-between h-14'
                                                variant={"ghost"}
                                            >
                                                <div className='flex items-center'>
                                                    <Image src={filteredToken.logoURI ? filteredToken.logoURI : "/images/polkadot_token_grey_logo.png"} alt={filteredToken.address} width={50} height={50} />
                                                    <span className='text-lg font-light'>{filteredToken.symbol}</span>
                                                </div>
                                                <span className='text-md font-light'>{filteredToken.name}</span>
                                            </Button>
                                            {index !== hotTokens.length - 1 && <Separator />}
                                        </>
                                    })
                                }
                            </div>
                    }
                </div>
                <DialogFooter />
            </DialogContent>
        </Dialog>
    )
}

export default SelectTokenDialog