//provide url of the single page 
import { useEffect, useState } from 'react'

export const useOrigin = () => {
    const [mounted, setMounted] = useState(false)
    //check the code whether be run in client side
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''
    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) {
        return ''
    } else {
        return origin
    }

}

