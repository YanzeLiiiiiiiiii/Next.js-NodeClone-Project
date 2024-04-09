'use client'

import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import Toolbar from '@/components/toolbar'
import CoverImage from '@/components/cover'
import Editor from '@/components/editor'
interface DocumentPage {
    params: {
        documentId: Id<'documents'>
    }

}

const DocumentPage = ({ params }: DocumentPage) => {
    const updata = useMutation(api.documents.update)
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    })

    if (document === undefined) {
        return <div>Loading....</div>
    }

    if (document === null) {
        return <div>Not Found</div>
    }
    const onChange = (content: string) => {
        updata({
            id: document._id,
            content
        })
    }

    return (
        <div className="pb-40">
            <CoverImage preview url={document.coverImage} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar preview initialData={document} />
                <Editor editable={false} content={document.content} onChange={onChange} />
            </div>
        </div>



    );
}

export default DocumentPage;