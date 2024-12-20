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

    async cambiarEstadoListoPedidos(numeroPedido: number, estado: string, nombre: string) {

        const API = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });
        let url = "/api/pedido/change-pedido";
        return await API.post(url, { numeroPedido, estado, nombre }).then((response) => { return response.data }).catch((error) => { throw Error(error) });
    }
    async allPedidos() {
        const API = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            headers: {
                "Content-Type": "application/json",
            }
        })
        let url = "/api/pedido/all"
        return await API.get(url, {}).then((response) => { return response.data }).catch((error) => console.log("ERROR ALL", error))
    }
}