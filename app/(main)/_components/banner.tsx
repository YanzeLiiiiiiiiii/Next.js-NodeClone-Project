'use client'
import { ConfirmModal } from '@/components/modals/confirm-modal'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


interface BannerProps {
    documentId: Id<'documents'>
}
const Banner = ({ documentId }: BannerProps) => {
    const router = useRouter()
    const remove = useMutation(api.documents.remove)
    const restore = useMutation(api.documents.restore)

    const onRemove = () => {
        const status = remove({ id: documentId })

        toast.promise(status, {
            loading: "Removing..",
            success: 'Removed',
            error: 'Something Wrong'
        })
        router.push('/documents')
    }

    const onRestore = () => {
        const status = restore({ id: documentId })
        toast.promise(status, {
            loading: "Removing..",
            success: 'Removed',
            error: 'Something Wrong'

        })
    }
    return (
        <div className=' m-2 w-[80%] bg-slate-200 text-center text-sm p-4 flex items-center gap-x-2 justify-center'>
            <p>
                This note is in the trash bin
            </p>

            <ConfirmModal onConfirm={onRemove}>
                <div role='button' className='rounded-sm p-2 hover:bg-neutral-200'>
                    <Button size='sm' variant='outline' className='bg-transparent border-white hover:bg-primary/5 '>Delete Page</Button>
                </div>
            </ConfirmModal>
            <Button size='sm' onClick={onRestore} variant='outline' className='bg-transparent border-white hover:bg-primary/5'>Restore Page</Button>

        </div >
    );
}

export default Banner;