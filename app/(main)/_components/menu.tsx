'use client'

import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from 'next/navigation'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";

interface MenuProps {
    documenId: Id<'documents'>

}

const Menu = ({ documenId }: MenuProps) => {
    const router = useRouter()
    const user = useUser()
    const archived = useMutation(api.documents.archive)

    const onArchive = () => {
        const promise = archived({ id: documenId })
        toast.promise(promise, {
            loading: 'deleting..',
            success: 'Deleted',
            error: 'Something Wrong'
        })
        router.push('/documents')
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button size='sm' variant='ghost'>
                    <MoreHorizontal className="h-4 w-5"></MoreHorizontal>

                </Button>
            </DropdownMenuTrigger>
            < DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount >
                <DropdownMenuItem onClick={onArchive}>
                    <Trash />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Menu;