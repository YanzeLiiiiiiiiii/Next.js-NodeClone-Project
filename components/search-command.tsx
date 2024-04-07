"use client";

import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { File } from "lucide-react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { useSearch } from "@/hooks/use-search";
import { api } from "@/convex/_generated/api";

export const SearchCommand = () => {
    const { user } = useUser();
    const router = useRouter();
    const documents = useQuery(api.documents.getSearch);
    const [isMounted, setIsMounted] = useState(false);

    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    //Prevent hydration error
    useEffect(() => {
        setIsMounted(true);
    }, [])

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [toggle]);

    const onSelect = (id: string) => {
        router.push(`/documents/${id}`)
        onClose()
    }


    if (!isMounted) {
        return null
    }
    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput
                placeholder={`Search ${user?.fullName}'s Note`}
            />
            <CommandList>
                <CommandEmpty>No Results Found</CommandEmpty>
                <CommandGroup heading='Documents'>
                    {documents?.map(item => {
                        return (
                            <CommandItem
                                key={item._id}
                                value={`${item._id}--${item.title}`}
                                title={item.title}
                                onSelect={() => { onSelect }}
                            >
                                {item.icon ? (
                                    <p className="mr-2 text-[18px]">
                                        {item.icon}
                                    </p>
                                ) : (
                                    <File className="mr-2 h-4 w-4" />
                                )}
                                <span>
                                    {item.title}
                                </span>
                            </CommandItem>
                        )
                    })}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}