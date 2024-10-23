import axios from "axios";

export class StockService {
    async obtenerStock() {
        const API = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            headers: {
                "Content-Type": "application/json",
            }
        })
        let url = "/api/stock/search"
        return await API.get(url).then((response) => response.data).catch((error) => console.log(error))
    }
}