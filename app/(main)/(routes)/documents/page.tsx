'use client'

import Image from 'next/image';
import { useUser } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
const DocumentsPage = () => {
    const { user } = useUser()
    const create = useMutation(api.documents.create)

    const onCreate = () => {
        const creaNote = create({ title: 'unTitles' })
        toast.promise(creaNote, {
            loading: 'Create a new note...',
            success: 'New note created',
            error: 'Something worng ....'
        })
    }

    return (
        <div className="h-full flex flex-col items-center 
       space-y-5 justify-center"
        >
            <Image src='/empty.png'
                height='300'
                width='300'
                alt='empth'
                className='dark:hidden'
            />
            <Image src='/empty-dark.png'
                height='300'
                width='300'
                alt='empty-dark'
                className='hidden dark:block'
            />
            <h2 className='text-lg font-medium'>
                Welcom to {user?.firstName}
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className='h-4 w-4 mr-2' />
                Create a Note
            </Button>

        </div>
    );
}

export default DocumentsPage;