'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRef, useState } from "react";

interface TitleProps {
    initialData: Doc<"documents">;
};
const Title = ({ initialData }: TitleProps) => {
    const update = useMutation(api.documents.update)
    const [isEdit, setIsEdit] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const [title, setTitle] = useState(initialData?.title || 'Untitle')

    const onInput = () => {
        setTitle(initialData.title)
        setIsEdit(true)
    }
    const disableInput = () => {
        setIsEdit(false);
    }

    //update db
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
        update({
            id: initialData._id,
            title: event.target.value || 'untitled'
        })
    }

    const closeInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'enter') {
            disableInput()
        }
    }
    return (
        <div className="flex items-center gap-x-1">
            {!!initialData?.icon && <p>{initialData.icon}</p>}
            {isEdit ? (
                <Input
                    className="h-7 px-2 focus-visible:ring-transparent"
                    ref={inputRef}
                    onClick={onInput}
                    value={title}
                    onKeyDown={closeInput}
                    onBlur={disableInput}
                    onChange={onChange}

                />
            ) : (
                <Button
                    onClick={onInput}
                    variant='ghost'
                    size='sm'
                    className="font-normal"

                >
                    <span className="truncate"> {initialData?.title}</span>
                </Button >
            )

            }
        </div>
    );
}
Title.Skeleton = function TitleSkeleton() {
    return (
        <Skeleton className="h-9 w-20 rounded-md" />
    );
};

export default Title;