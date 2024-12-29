'use client';
import { queryClient } from '@/configs/query.config';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react'

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default ReactQueryProvider