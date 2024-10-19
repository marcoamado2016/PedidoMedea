import axios, { AxiosRequestConfig } from "axios";
interface StockProps {
    endpoint: string
    redirectRoute?: string
    queryParams?: any
    options?: AxiosRequestConfig<any>
}
export function usStockGetFetch() {

    const stockProductoGetRouter = async ({ endpoint, queryParams, options, redirectRoute }: StockProps) => {
        const url = `/api/stock/${endpoint}${queryParams ? `?${new URLSearchParams(queryParams).toString()}` : ''}`;
        const resp = await axios.get(url, options)
        return resp;
    }

    return stockProductoGetRouter;


}