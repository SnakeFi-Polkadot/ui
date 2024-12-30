import CreateLiquidityDetail from '@/components/liquidity/create/create-liquidity-detail'
import CreateLiquidityHeader from '@/components/liquidity/create/create-liquidity-header'
import React from 'react'

const CreateLiquidityPoolPage = () => {
    return (
        <main className='flex flex-col gap-4 xl:px-80 xl:py-20 lg:px-60 lg:py-15 sm:px-40 sm:py-10
        px-30 px-5 h-screen w-full'>
            <CreateLiquidityHeader className='w-full' />
            <div className="flex lg:flex-row lg:items-center lg:gap-5 w-full">
                <CreateLiquidityDetail className='w-1/2' />
            </div>
        </main>
    )
}

export default CreateLiquidityPoolPage