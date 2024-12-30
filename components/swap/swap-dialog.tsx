'use client';
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { LoadingSpinner } from '../loadingSpinner';

interface SwapDialogProps {
    disabled?: boolean;
    loading: boolean;
}

const SwapDialog = ({ disabled, loading }: SwapDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled} variant={"default"} className="text-primary text-xl bg-secondary hover:bg-secondary/70 w-full h-14 transition-all duration-400 hover:opacity-75">
                    {loading
                        ? <LoadingSpinner />
                        : "Swap"
                    }
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                </DialogHeader>

            </DialogContent>
        </Dialog>
    )
}

export default SwapDialog