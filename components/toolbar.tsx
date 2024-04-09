'use client'

import { Doc } from "@/convex/_generated/dataModel";
import IconPicker from "./icon-picker";
import { ImageIcon, Smile, X } from "lucide-react";
import { Button } from "./ui/button";
import { ElementRef, useRef, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize'
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useImage } from '@/hooks/use-image'
interface Toolbar {
    initialData: Doc<'documents'>
    preview?: boolean
}

const Toolbar = ({ initialData, preview }: Toolbar) => {
    const inputRef = useRef<ElementRef<'textarea'>>(null)
    const [isEdited, setIsEdit] = useState(false)
    const [value, setValue] = useState(initialData.title)

    const update = useMutation(api.documents.update)

    const coverImage = useImage()
    const enableInput = () => {
        if (preview) return
        setIsEdit(true)
        setTimeout(() => {
            setValue(initialData.title)
            inputRef.current?.focus()
        }, 0);
    }

    const disableInput = () => {
        setIsEdit(false)
    }

    const onInput = (value: string) => {
        setValue(value)
        update({
            id: initialData._id,
            title: value || 'Untitled'
        })
    }

    const keyDonw = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            disableInput()
        }

    }


    const removeICon = useMutation(api.documents.removeIcon)

    const selectIcon = (icon: string) => {
        update({
            id: initialData._id,
            icon
        })
    }
    const iconRemove = () => {
        removeICon({ id: initialData._id })
    }

    return (

        <div className="pl-54 group relative">
            {!!initialData.icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker onChange={selectIcon}>
                        <p className="text-6xl hover:opacity-75 transition"></p>
                        {initialData.icon}
                    </IconPicker>

                    {/* remove icon */}
                    <Button
                        onClick={iconRemove}
                        className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
                        variant='outline'
                        size='icon'
                    >
                        <X className="h-4 w-4"></X>
                    </Button>

                </div>

            )
            }

            {//guest view
                !!initialData.icon && preview && (
                    <p className="text-6xl pt-6">
                        {initialData.icon}
                    </p>
                )

            }

            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-2">
                {!initialData.icon && !preview && (
                    <IconPicker asChild onChange={selectIcon}>
                        <Button className="text-muted-foreground text-xs" variant='outline' size='sm'>
                            <Smile className="h-4 w-4 mr-2" />
                            Add Icon
                        </Button>

                    </IconPicker>
                )

                }
                {!initialData.coverImage && !preview && (
                    <Button
                        onClick={coverImage.onOpen}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Add cover
                    </Button>
                )}

            </div>
            {isEdited && !preview ?
                (<TextareaAutosize
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={keyDonw}
                    onChange={e => onInput(e.target.value)}
                    value={value}
                    className="text-4xl bg-transparent font-bold break-words outline-none
                        text-[#2f2f2f] dark:text-[#cfcfcf] resize-none
                    "
                />) : (
                    <div onClick={enableInput} className="pb-[12px] text-4xl font-bold break-words  text-[#2f2f2f] dark:text-[#cfcfcf] resize-none">{initialData.title}</div>
                )
            }

        </div>)
}
export default Toolbar