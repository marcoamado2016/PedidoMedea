import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";

interface ProductoPros {
    endpoind: string;
    redirectRoute?: string;
    formData: any;
    options?: AxiosRequestConfig<any>;
}
export function useProductoPrecioFetch() {
    const router = useRouter();
    const productoPrecioRouter = async ({ endpoind, formData, options, redirectRoute }: ProductoPros) => {
        try {
            const resp = await axios.post(
                `/api/producto/${endpoind}`,
                formData,
                options
            )
            if (redirectRoute) router.push(redirectRoute)
            return resp;
        } catch (error: any) {
            console.log("Error ", error)
            throw error;
        }
    }

    return productoPrecioRouter;
}