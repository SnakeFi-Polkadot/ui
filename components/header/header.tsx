import React from 'react'
import NavBar from './navbar'
import MobileNavBar from './mobile-navbar'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Link from 'next/link'

function Header() {
    return (
        <div className="bg-foreground flex flex-row items-center justify-around gap-5 max-h-[80px] text-primary px-4 py-2">
            {/* TODO: Implement the Logo as the Home Button  */}
            <Link className="h-full p-2 w-[120px] hover:scale-90 hover:transition-all hover:ease-linear hover: duration-100" href="/">
                <AspectRatio ratio={16 / 9}>
                    <Image src="/images/logo.jpg" alt="Snake Finance" className="rounded-md object-cover" fill />
                </AspectRatio>
            </Link>
            <NavBar containerStyles='hidden xl:flex flex-row items-center justify-between gap-5 text-xs xl:text-sm' />
            <div className="flex flex-row items-center justify-between gap-10">
                <MobileNavBar containerStyles='xl:hidden' />
                <ConnectButton showBalance={true} />
            </div>
        </div >
    )
}

export default Header