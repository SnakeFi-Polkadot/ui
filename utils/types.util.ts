import { Address } from "viem";

export interface Token {
  address: string | `0x${string}`;
  name?: string;
  symbol?: string;
  decimals?: number;
  type: "wrapped" | "native" | "normal";
  logoURI?: string;
}

export enum PoolType {
  STABLE = "STABLE",
  VOLATILE = "VOLATILE",
}

export type LiquidityPool = {
  address: Address;
  symbol: string;
  name: string;
  decimals: number;
  stable: boolean;
  totalSupply: bigint;
  reserve0: bigint;
  reserve1: bigint;
  token0Address: Address;
  token1Address: Address;
  gaugeAddress: Address;
  tvl: number;
  apr: number;
};
