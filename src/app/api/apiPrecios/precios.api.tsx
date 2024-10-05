import axios from "axios"

export class ProductoPrecioService {

    async obtenerPrecios() {
        const API = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            headers: {
                "Content-Type": "application/json",
            }
        })
        let url = "/api/producto/search"
        return await API.get(url).then((response) => response.data).catch((error) => { throw Error(error) })
    }
}