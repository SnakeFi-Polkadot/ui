'use client';
import React from 'react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { config as wagmiConfig } from '@/configs/wagmi.config'
import { wagmiCustomTheme } from '@/utils/theme.util';

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitProvider>
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  )
}

export default WalletProvider