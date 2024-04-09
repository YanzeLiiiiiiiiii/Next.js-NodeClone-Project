'use client'

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Title from "./title";
import Banner from "./banner";
import Menu from "./menu";
import { Publish } from './publish'
interface NavProps {
    isCollapsed: boolean
    resetPosition: () => void
}

const Navbar = ({
    isCollapsed, resetPosition
}: NavProps) => {
    const params = useParams()
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<'documents'>
    })

    if (document === undefined) {
        return (
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
                <Title.Skeleton />

            </nav>
        )
    }
    if (document === null) {
        return null;
    }
    return (
        <>
            <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 flex items-center gap-x-4">
                {isCollapsed && (
                    <MenuIcon role="button"
                        onClick={resetPosition}
                        className="h-6 w-6 text-muted-foreground"
                    />
                )}
                <div className="flex items-center justify-between w-full">
                    <Title initialData={document} />
                    <div className="flex items-center gap-x-2">
                        <Publish initialData={document} />
                        <Menu documenId={document._id} />
                    </div>
                </div>
            </nav>

            {/* if note is deleted show banner component */}
            {document.isArchived && (
                <Banner documentId={document._id}></Banner>
            )}
        </>
    );
}

export default Navbar;