export interface Token {
  address: string | `0x${string}`;
  name?: string;
  symbol?: string;
  decimals?: number;
  type: "wrapped" | "native" | "normal";
  logoURI?: string;
}
