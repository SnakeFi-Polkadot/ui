'use client';
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface CreateLiquidityHeaderProps {
    className?: string
}

const CreateLiquidityHeader = ({ className }: CreateLiquidityHeaderProps) => {
    const router = useRouter();

    return (
        <div className={cn(
            "",
            className
        )}>
            <Button
                className="flex flex-row items-center justify-start gap-2 hover:bg-inherit"
                variant={"ghost"}
                onClick={() => router.replace("/liquidity")}
            >
                <ArrowLeftIcon size={24} />
                <span className='text-xs font-extralight'>Pools</span>
            </Button>
        </div>
    )
}

export default CreateLiquidityHeader