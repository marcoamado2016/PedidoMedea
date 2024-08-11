'use client'
import { useState } from "react"
import './pedido.css'
export default function registrarPedido() {
    const [fechaPedido, setFechaPedido] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [numeroPedido, setnumeroPedido] = useState('');
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(fechaPedido, ": ", descripcion, ": ", numeroPedido)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="div">

                <label>
                    Ingrese la fecha del pedidos
                    <input
                        type="date"
                        value={fechaPedido}
                        onChange={(e) => setFechaPedido(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Numero pedido
                    <input
                        name="numeroPeido"
                        placeholder="pedido"
                        value={numeroPedido}
                        onChange={(e) => setnumeroPedido(e.target.value)}
                    />

                </label>
            </div>


            <br />
            <button type="submit">Realizar pedido</button>
        </form>
    )
} 