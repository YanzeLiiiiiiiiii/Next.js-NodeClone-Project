'use client'
import { cn } from "@/lib/utils";
import { ChevronLeft, MenuIcon, Plus, PlusCircle, Search, Trash } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { ElementRef, useRef, useState, useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts'
import { UserItem } from './user-item'
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "./item";
import { toast } from 'sonner'
import { DocumentList } from "./document-list";
import Navbar from './navbar'

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import TrashBox from "./trash-box";
import { useSearch } from "@/hooks/use-search";
const Navigation = () => {
    const search = useSearch()
    //check page size
    const isMoblie = useMediaQuery('(max-width:768px)')
    const isResizingRef = useRef(false)
    const siderbarRef = useRef<ElementRef<'aside'>>(null)
    const navRef = useRef<ElementRef<'div'>>(null)
    const [isResetting, setIsResetting] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(true)
    const params = useParams()


    const create = useMutation(api.documents.create)

    //allowing to drag the sidebar 
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        isResizingRef.current = true
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)

    }

    //resize the sidebar upon mouse move 
    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return
        let newWidth = event.clientX
        if (newWidth < 240) newWidth = 240
        if (newWidth > 480) newWidth = 480
        if (navRef.current && siderbarRef.current) {
            siderbarRef.current.style.width = `${newWidth}px`
            navRef.current.style.setProperty('left', `${newWidth}px`)
            navRef.current.style.setProperty('width', `calc(100%-${newWidth}px)`)
        }

    }


    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseMove)
    }

    const resetPosition = () => {
        if (siderbarRef.current && navRef.current) {
            setIsResetting(true)
            setIsCollapsed(false)
            siderbarRef.current.style.width = isMoblie ? '100%' : '240px'
            navRef.current.style.setProperty('width', isMoblie ? '0' : 'calc(100%-240px)')
            navRef.current.style.setProperty('left', isMoblie ? '100%' : '240px')
            //remove transition 
            setTimeout(() => setIsResetting(false), 300);
        }
    }
    //sidebar collpse funtion
    const handleCollpse = () => {
        if (siderbarRef.current && navRef.current) {
            setIsCollapsed(true)
            setIsResetting(true)
            siderbarRef.current.style.width = '0'
            navRef.current.style.setProperty('width', '100%')
            navRef.current.style.setProperty('left', '0')
        }
        setTimeout(() => {
            setIsResetting(false)
        }, 300);
    }

    //bar resize base on page size 
    useEffect(() => {
        if (isMoblie) {
            handleCollpse()
        } else {
            resetPosition()
        }
    }, [isMoblie])
    useEffect(() => {
        if (isMoblie) {
            handleCollpse()
        }
    }, [isMoblie, usePathname])

    //toast notification
    const handeCreate = () => {
        const createNote = create({ title: 'UnTitled' })
        toast.promise(createNote, {
            loading: 'Creating a new note...',
            success: 'New note created',
            error: 'Somthing Wrong..'
        })
    }
    return (
        <>
            <aside
                ref={siderbarRef}
                className={cn(
                    "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[50]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMoblie && "w-0"
                )}>
                <div
                    onClick={handleCollpse}
                    role="button"
                    className="h-6 w-6 text-muted-foreground rounded-sm bg-neutral-300
                     absolute top-3 right-2 opacity-0 dark:hover:bg-neutral-600 group-hover/sidebar:opacity-100 transition
                "
                >
                    <ChevronLeft className="h-6 w-6" />
                </div>
                <div>
                    <UserItem />
                    <Item
                        onClick={search.onOpen}
                        label='Search'
                        icon={Search}
                        isSearch
                    />
                    {/* <Item
                        onClick={() => { }}
                        label='Setting'
                        icon={Settings}

                    /> */}
                    <Item
                        onClick={handeCreate}
                        label='New Page'
                        icon={PlusCircle}
                    />
                </div>
                <div>
                    <p className=" mt-4">
                        <DocumentList />
                        <Item
                            onClick={handeCreate}
                            label='Add New Page'
                            icon={Plus}
                        />
                        <Popover>
                            <PopoverTrigger className="w-full mt-3" >
                                <Item label="Trash" icon={Trash} />
                            </PopoverTrigger >
                            <PopoverContent className='w-72 p-2' side={isMoblie ? 'bottom' : 'right'}>
                                <TrashBox />
                            </PopoverContent>
                        </Popover>
                    </p>
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetPosition}
                    className="opacity-0 group-hover/sidebar:opacity-100
              transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0">

                </div>
            </aside>
            <div
                ref={navRef}
                className={cn(
                    "absolute top-0 z-[100] left-60 w-[calc(100%-240px)] ",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMoblie && "left-0 w-full"
                )}
            >
                {!!params.documentId ? (<Navbar
                    isCollapsed={isCollapsed}
                    resetPosition={resetPosition}
                />) : (<nav>
                    {isCollapsed && <MenuIcon onClick={resetPosition} className="w-6 h-6 text-muted-foreground" />}
                </nav>)}


            </div>
        </>
    );
}

export default Navigation;