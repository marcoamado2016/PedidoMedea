import { useState } from "react"

interface LoaderState {
    isLoading: boolean
    startLoading: () => void
    finishLoading: () => void
}

export function useLoading(): LoaderState {
    const [isLoading, setIsloading] = useState(false)

    const startLoading = () => {
        setIsloading(true)
    }
    const finishLoading = () => {
        setIsloading(false)
    }
    return {
        isLoading,
        startLoading,
        finishLoading
    }
}