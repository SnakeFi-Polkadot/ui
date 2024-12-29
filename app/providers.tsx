'use client';

import * as React from 'react';
import { Provider as JotaiProvider } from 'jotai';
import WalletProvider from '@/providers/wallet.provider';
import ReactQueryProvider from '@/providers/query.provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <ReactQueryProvider>
        <WalletProvider>
          {children}
        </WalletProvider>
      </ReactQueryProvider>
    </JotaiProvider>
  );
}
