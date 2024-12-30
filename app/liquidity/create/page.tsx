import CreateLiquidityHeader from '@/components/liquidity/create/create-liquidity-header'
import CreateLiquidityPanel from '@/components/liquidity/create/create-liquidity-panel'
import React from 'react'

const CreateLiquidityPoolPage = () => {
    return (
        <main className='bg-foreground/80 flex flex-col gap-4 xl:px-80 xl:py-20 lg:px-60 lg:py-15 sm:px-40 sm:py-10 px-30 px-5 h-screen w-full'>
            <CreateLiquidityHeader className='w-full' />
            <CreateLiquidityPanel className='w-full' />
        </main>
    )
}

export default CreateLiquidityPoolPage