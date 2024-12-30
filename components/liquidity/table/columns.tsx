"use client"

import { LiquidityPool, PoolType } from "@/utils/types.util"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { numberFormatter } from "@/utils/format.util"

export const columns: ColumnDef<LiquidityPool>[] = [
    {
        accessorKey: "poolAddress",
        header: "Pool",
        cell: ({ row }) => {
            return (
                <div className="flex flex-row items-center gap-4 w-full">
                    <div className="flex flex-row items-center relative w-10 h-auto">
                        <Image
                            src={"/images/polkadot_token_logo.png"}
                            alt={row.original.token0Address}
                            className="absolute left-0 rounded-lg"
                            width={120}
                            height={120}
                        />
                        <Image
                            src={"/images/polkadot_token_logo.png"}
                            alt={row.original.token1Address}
                            className="absolute left-4 rounded-lg"
                            width={120}
                            height={120}
                        />
                    </div>
                    <div className="flex flex-col justify-center gap-2 text-xs font-extralight">
                        <span>{row.original.name}</span>
                        <span>{row.original.stable ? "Stable pool" : "Volatile pool"}</span>
                    </div>
                </div>

            )
        }
    },
    {
        accessorKey: "apr",
        header: "APR",
        cell: ({ row }) => {
            const formatAPR = parseFloat(row.getValue("apr")) / 100;
            return <span className="text-xs font-extralight">{formatAPR}%</span>
        },
    },
    {
        accessorKey: "tvl",
        header: "TVL",
        cell: ({ row }) => {
            const formatTVL = numberFormatter.format(row.getValue("tvl"));
            return <span className="text-xs font-extralight">${formatTVL}</span>
        },
    },
    {
        accessorKey: "myPoolAmount",
        header: "My Pool Amount",
        cell: ({ row }) => {
            return <span className="text-xs font-extralight">NaN</span>
        },
    },
    {
        accessorKey: "myStakedAmount",
        header: "My Staked Amount",
        cell: ({ row }) => {
            return <span className="text-xs font-extralight">NaN</span>
        },
    },
    {
        id: 'actions',
        header: "Actions",
        cell: ({ row }) => {
            const pool = row.original

            return (
                <Link href={`/liquidity/${pool.address}`}>
                    <Button variant="outline" className="p-2" asChild>
                        <span className="text-sm">Manage</span>
                    </Button>
                </Link>
            )
        },
    }
]
