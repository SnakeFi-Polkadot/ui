import { PROJECT_ID } from '@/utils/constants.util';
import {
    getDefaultWallets,
    getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
    trustWallet,
    ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { defineChain, http } from 'viem';

export const westendAssetHub = defineChain({
    id: 420420421,
    name: "Westend AssetHub",
    nativeCurrency: {
        decimals: 18,
        name: 'Westend',
        symbol: 'WND',
    },
    rpcUrls: {
        default: {
            http: ['https://westend-asset-hub-eth-rpc.polkadot.io'],
            webSocket: ['wss://westend-asset-hub-eth-rpc.polkadot.io'],
        },
    },
    blockExplorers: {
        default: { name: 'Explorer', url: 'https://assethub-westend.subscan.io' },
    },
    contracts: {
        multicall3: {
            address: '0x5545dec97cb957e83d3e6a1e82fabfacf9764cf1',
            blockCreated: 10174702,
        },
    },
})

const { wallets } = getDefaultWallets();

export const config = getDefaultConfig({
    appName: "S_N_A_K_E__F_I_N_A_N_C_E",
    projectId: PROJECT_ID,
    wallets: [
        ...wallets,
        {
            groupName: 'Other',
            wallets: [trustWallet, ledgerWallet],
        },
    ],
    chains: [
        westendAssetHub,
        // moonbeam,
        // moonbaseAlpha
    ],
    transports: {
        [westendAssetHub.id]: http(),
        // [moonbeam.id]: http(),
        // [moonbaseAlpha.id]: http(),
    },
    ssr: true, // Because it is Nextjs's App router, you need to declare ssr as true
});