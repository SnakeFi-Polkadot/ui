'use client';
import { SettingsIcon } from 'lucide-react'
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';

interface SwapSettingProps {
    settings: {
        slippage: number;
        approveInfinity: boolean;
    },
    setSettings: (one: {
        slippage: number;
        approveInfinity: boolean;
    }) => void;
}

const SwapSetting = ({ settings, setSettings }: SwapSettingProps) => {
    const [localSettings, setLocalSettings] = useState<{
        slippage: number | undefined,
        approveInfinity: boolean
    }>({
        slippage: settings.slippage,
        approveInfinity: settings.approveInfinity
    });
    const [openPopover, setOpenPopover] = useState<boolean>(false);
    return (
        <div className='flex flex-row items-center justify-between gap-2 w-full'>
            <span className="text-2xl font-bold">Swap your token</span>
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger asChild>
                    <Button className='rounded-full text-secondary p-2 active:text-primary/70 group '>
                        <SettingsIcon size={20} className='group-hover:scale-150 transition-all duration-200 ease-linear' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align='end' className='flex flex-col justify-center items-center gap-4 p-5'>
                    <div className="grid grid-cols-5 items-center gap-4 w-full">
                        <Label className='text-sm col-span-2' htmlFor="slippage">Slippage</Label>
                        <Input
                            id="slippage"
                            type='number'
                            step={'0.01'}
                            value={settings.slippage}
                            onChange={(e) => setLocalSettings({
                                ...localSettings,
                                slippage: Number(e.target.value)
                            })}
                            className="col-span-2 h-8"
                        />
                        <Label htmlFor="slippage">%</Label>
                    </div>
                    <div className="grid grid-cols-5 items-center gap-4">
                        <Label className='text-sm col-span-2' htmlFor="approveInfinity">Approve infinity</Label>
                        <RadioGroup
                            className='grid-flow-col space-x-3'
                            id='approveInfinity'
                            defaultValue={localSettings.approveInfinity ? "option-yes" : "option-no"}
                            orientation='vertical'
                            onValueChange={
                                (value) => setLocalSettings({
                                    ...localSettings,
                                    approveInfinity: value == "option-yes" ? true : false
                                })
                            }
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-no" id="option-no" />
                                <Label htmlFor="option-no">No</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-yes" id="option-yes" />
                                <Label htmlFor="option-yes">Yes</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button
                        variant={'secondary'}
                        className='w-full text-background'
                        onClick={() => {
                            setSettings({
                                slippage: localSettings.slippage || 0.5,
                                approveInfinity: localSettings.approveInfinity
                            });
                            setOpenPopover(false);
                        }}
                        disabled={settings.slippage == localSettings.slippage && settings.approveInfinity == localSettings.approveInfinity}
                    >
                        Apply
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default SwapSetting