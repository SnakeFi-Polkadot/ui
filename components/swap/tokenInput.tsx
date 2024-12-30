'use client';
import React from 'react'
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import SelectTokenDialog from './selectTokenDialog';
import { Token } from '@/utils/types.util';


export type TokenInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    inputStyles?: string;
    fromToken?: Token;
    toToken?: Token;
    selectFromToken: (token: Token | undefined) => void;
    selectToToken: (token: Token | undefined) => void;
    inputValue?: number;
    setInputValue: (value: number) => void;
    placeHolder?: string;
    isFrom: boolean;
}

const TokenInput = React.forwardRef<HTMLInputElement, TokenInputProps>(
    ({ className, fromToken, toToken, selectFromToken, selectToToken, inputValue, setInputValue, inputStyles, placeHolder, isFrom, ...props }, ref) => {
        return (
            <div className={cn(
                "flex h-10 items-center  justify-between rounded-md border-2 border-input bg-background pl-3 text-sm ring-offset-background w-full",
                className,
            )}>
                <SelectTokenDialog isFrom={isFrom} fromToken={fromToken} toToken={toToken} selectFromToken={selectFromToken} selectToToken={selectToToken} />
                <input
                    {...props}
                    type='text'
                    inputMode='numeric'
                    placeholder={placeHolder}
                    ref={ref}
                    readOnly={!isFrom}
                    dir='rtl'
                    max={100000000000000000000}
                    className={`w-auto p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-background ${inputStyles} text-lg`}
                    value={inputValue}
                    pattern='/^\d*\.?\d*$/'
                    onChange={(e) => {
                        console.log(e.target.value)
                        setInputValue(Number(e.target.value))
                    }}
                />
            </div >
        );
    }
);

export default TokenInput