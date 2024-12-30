"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Token } from "@/utils/types.util";
import SelectTokenDialog from "./select-token-dialog";

export type TokenInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inputStyles?: string;
  token?: Token;
  selectToken: (token: Token | undefined) => void;
  inputValue?: number;
  setInputValue: (value: number) => void;
  placeHolder?: string;
};

const TokenInput = React.forwardRef<HTMLInputElement, TokenInputProps>(
  (
    {
      className,
      token,
      selectToken,
      inputValue,
      setInputValue,
      inputStyles,
      placeHolder,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "flex h-10 items-center  justify-between rounded-md border-2 border-input bg-background pl-3 text-sm ring-offset-background w-full",
          className
        )}
      >
        <SelectTokenDialog
          token={token}
          selectToken={selectToken}
        />
        <input
          {...props}
          type="text"
          inputMode="numeric"
          placeholder={placeHolder}
          ref={ref}
          dir="rtl"
          max={100000000000000000000}
          className={`w-auto p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-background ${inputStyles} text-lg`}
          value={inputValue}
          pattern="/^\d*\.?\d*$/"
          onChange={(e) => {
            console.log(e.target.value);
            setInputValue(Number(e.target.value));
          }}
        />
      </div>
    );
  }
);

export default TokenInput;
