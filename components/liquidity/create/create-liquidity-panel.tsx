'use client';
import { cn } from '@/lib/utils';
import React from 'react'
import CreateLiquidityDetail from '@/components/liquidity/create/create-liquidity-detail'
import CreateLiquidityInput from './create-liquidity-input';

interface CreateLiquidityPanelProps {
    className?: string
}

const CreateLiquidityPanel = ({ className }: CreateLiquidityPanelProps) => {
    return (
        <div className={cn(
            "flex lg:grid lg:grid-cols-2 lg:gap-5 w-full",
            className
        )}>
            <CreateLiquidityDetail className='col-span-1 bg-primary' />
            <CreateLiquidityInput className='col-span-1 bg-primary' />
        </div>
    )
}

export default CreateLiquidityPanel