'use client';
import { SettingsIcon } from 'lucide-react'
import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface SwapSettingProps {

}

const SwapSetting = ({ }: SwapSettingProps) => {
    return (
        <div className='flex flex-row items-center justify-end gap-2 w-full'>
            <Popover>
                <PopoverTrigger><SettingsIcon size={20} /></PopoverTrigger>
                <PopoverContent className='flex flex-col justify-center items-center gap-2 p-5'>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="slippage">Slippage</Label>
                        <Input
                            id="slippage"
                            defaultValue="0"
                            max={100}
                            className="col-span-2 h-8"
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="approveInfinity">Approve infinity</Label>
                        <RadioGroup id='approveInfinity' defaultValue="option-one">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-one" id="option-one" />
                                <Label htmlFor="option-one">Option One</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-two" id="option-two" />
                                <Label htmlFor="option-two">Option Two</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="width">Width</Label>
                        <Input
                            id="width"
                            defaultValue="100%"
                            className="col-span-2 h-8"
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default SwapSetting