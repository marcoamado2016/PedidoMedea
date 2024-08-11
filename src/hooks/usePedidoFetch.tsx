import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";


interface PedidoProps {
    endpoint: string
    redirectRoute?: string
    formData: any
    options?: AxiosRequestConfig<any>
}

export function usePedidoFetch() {

    const router = useRouter();
    const pedidioRouter = async ({ endpoint, redirectRoute, formData, options }: PedidoProps) => {
        try {

            const resp = await axios.post(
                `/api/pedido/${endpoint}`,
                formData,
                options
            )
            if (redirectRoute) router.push(redirectRoute)
            return resp
        } catch (error: any) {
            console.log("Error ", error)
            throw error;
        }
    }

    return pedidioRouter;
}