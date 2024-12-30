import LiquidityHeader from '@/components/liquidity/liquidity-header'
import LiquidityPoolTable from '@/components/liquidity/liquidity-table'

import React from 'react'

const LiquidityPage = () => {
    return (
        <main className="flex flex-col gap-4 p-20 h-screen w-full">
            <LiquidityHeader className='w-full' />
            <LiquidityPoolTable />
        </main>
    )
}

export default LiquidityPage