'use client'
import EmojiPicker, { Theme } from 'emoji-picker-react'
import { useTheme } from 'next-themes'

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
interface IconPicker {
    onChange: (icon: string) => void
    children: React.ReactNode
    asChild?: boolean
}

const IconPicker = ({ onChange, children, asChild }: IconPicker) => {
    const { resolvedTheme } = useTheme()
    const currentTheme = (resolvedTheme || 'light') as keyof typeof thememap
    const thememap = {
        'dark': Theme.DARK,
        'light': Theme.LIGHT
    }

    const theme = thememap[currentTheme]
    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full border-none shadow-none">
                <EmojiPicker
                    height={350}
                    theme={theme}
                    onEmojiClick={(data) => onChange(data.emoji)}
                />
            </PopoverContent>
        </Popover>
    );
}

export default IconPicker;