import  NotificacionContext  from "@/context/NotificationContext"
import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from "next/navigation"
import { useContext } from "react"


interface AuthFetchProps {
    endpoint: string
    redirectRoute?: string
    formData: any
    options?: AxiosRequestConfig<any>
}

export function useAuthFetch() {
    
    const router = useRouter()

    const authRouter = async ({ endpoint, formData, redirectRoute, options }: AuthFetchProps) => {

        try {

            const { data } = await axios.post(
                `/api/auth/${endpoint}`,
                formData,
                options)

            console.log("data front ", data)

            if (redirectRoute) router.push(redirectRoute)
        } catch (error: any) {
            console.log("Error ", error)
           
        }
    }

    return authRouter
}