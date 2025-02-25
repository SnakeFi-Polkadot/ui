"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";
import { CheckCircleIcon } from "lucide-react";

const ButtonGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn("flex gap-5", className)}
            {...props}
            ref={ref}
        />
    );
});
ButtonGroup.displayName = RadioGroupPrimitive.Root.displayName;

const ButtonGroupItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    {
        icon?: React.ReactNode;
        label: string;
        checkIcon?: boolean;
        checkIconSize?: number;
    } & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, icon, label, checkIcon, checkIconSize = 30, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                "border data-[state=checked]:bg-background text-center h-[125px] w-[125px] rounded-md focus:outline-none 2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        >
            {checkIcon && <RadioGroupPrimitive.RadioGroupIndicator className="relative">
                <div className="relative">
                    <div className="absolute -ml-2 -mt-[30px] ">
                        <CheckCircleIcon size={checkIconSize} className="text-primary" />
                    </div>
                </div>
            </RadioGroupPrimitive.RadioGroupIndicator>}


            <div className="flex flex-col justify-center">
                <div className="self-center">{icon}</div>
                <div className="text-sm pt-2">{label}</div>
            </div>
        </RadioGroupPrimitive.Item>
    );
});
ButtonGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { ButtonGroup, ButtonGroupItem };