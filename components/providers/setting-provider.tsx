// Avoid hydration error
'use client'
import { useState, useEffect } from 'react'
import SettingsModal from '@/components/modals/setting-modal'
import CoverImageModal from '@/components/modals/cover-image'
const ModalProvider = () => {
    const [ismounted, setismouted] = useState(false)
    useEffect(() => {
        setismouted(true)

    }, [])
    if (!ismounted) return null
    return (
        <>
            <SettingsModal />
            <CoverImageModal />
        </>
    )


}

export default ModalProvider;