import axios from "axios";

export class PedidoServicio {
    async obtenerSiguienteNumeroPedido() {
        const API = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });
        let url = '/api/pedido/next-pedido';
        return await API.get(url).then((response) => { return response.data }).catch((error) => { throw Error(error) });

    }
}