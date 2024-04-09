"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog";
import { useImage } from '@/hooks/use-image'
import { SingleImageDropzone } from '@/components/single-image-dropzone'
import { useEdgeStore } from "@/lib/edgestore";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
const CoverImageModal = () => {

    const parms = useParams()
    const update = useMutation(api.documents.update)
    const coverImage = useImage()
    const { edgestore } = useEdgeStore()


    const [file, setFile] = useState<File>()
    const [submit, setSubmit] = useState(false)

    const onClose = () => {
        setFile(undefined)
        setSubmit(false)
        coverImage.onClose()
    }

    const onChange = async (file?: File) => {
        if (file) {
            setSubmit(true);
            setFile(file);

            const res = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverImage.url
                }
            });

            await update({
                id: parms.documentId as Id<"documents">,
                coverImage: res.url
            });

            onClose();
        }

    }
    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">Cover Image</h2>
                </DialogHeader>
                <SingleImageDropzone className="w-full outline-none" disabled={submit} onChange={onChange} value={file} />
            </DialogContent>

        </Dialog>

    )

}

export default CoverImageModal