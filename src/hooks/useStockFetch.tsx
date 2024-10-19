import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";
interface StockProps {
    endpoind: string;
    redirectRouter?: string;
    formData?: any;
    options?: AxiosRequestConfig<any>;
}

export function useStockProductoFetch() {
    const router = useRouter();
    const stockProductoRouter = async ({ endpoind, formData, options, redirectRouter }: StockProps) => {
        try {
            const resp = await axios.post(
                `/api/stock/${endpoind}`,
                formData,
                options
            )
            if (redirectRouter) router.push(redirectRouter);
            return resp;
        } catch (error) {
            throw error;
        }

    }
    return stockProductoRouter;
}