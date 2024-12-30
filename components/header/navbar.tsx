'use client';
import React from 'react'
import Link from "next/link";
import { Button } from '../ui/button'

import { usePathname } from 'next/navigation';

// framer motion
import { motion } from "framer-motion";

interface NavBarProps {
    containerStyles?: string,
    linkStyles?: string,
    underlineStyles?: string
}

const links = [
    {
        name: "Swap",
        path: "/swap"
    },
    {
        name: "Liquidity",
        path: "/liquidity"
    },
    {
        name: "Stake",
        path: "/stake"
    },
    {
        name: "Boost NFT",
        path: "/boost-nft"
    },
    {
        name: "Rewards",
        path: "/rewards"
    },
    {
        name: "Snake",
        path: "/snake"
    },
    {
        name: "Governance",
        path: "/governance"
    }
];

const getParentPath = (path: string) => {
    const arrayNamePath = path.split("/");
    return `/${arrayNamePath[1]}`;
};

function NavBar({ containerStyles, linkStyles, underlineStyles }: NavBarProps) {
    const path = usePathname();
    const parentPath = getParentPath(path!);
    return (
        <nav className={`${containerStyles}`}>
            {links.map((link, index) => {
                return (
                    <Link
                        href={link.path}
                        key={index}
                        className={`
                            px-5 py-3 rounded-xl ${`capitalize ${linkStyles}`} ${link.path === parentPath
                                ? `font-bold bg-white text-foreground`
                                : "hover:text-secondary"
                            } transition-all ease-linear duration-100
                                text-center text-wrap`}
                    >
                        {link.path === parentPath && (
                            <motion.span
                                initial={{ y: "-100%" }}
                                animate={{ y: 0 }}
                                transition={{ type: "tween" }}
                                layoutId="underline"
                                className={`${underlineStyles}`}
                            />
                        )}
                        {link.name}
                    </Link>
                );
            })}
        </nav >
    )
}

export default NavBar