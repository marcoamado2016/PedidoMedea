'use client'
import { useRouter } from "next/navigation";
import Head from 'next/head';
export default async function HomePage() {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>Panel de control de pedidos</title>
            </Head>
            <div style={{ textAlign: 'center' }}> <p >Panel de control</p></div>
            <div>
                <button
                    style={{
                        borderRadius: 20,
                        margin: 16,
                        width: 160,
                        minHeight: 200,
                        maxHeight: 200,
                        boxShadow: "5px 5px 30px -5px rgba(0,0,0,0.75)",
                        backgroundColor: "#fafafa",
                    }}
                    onClick={() => window.open('/bandejaPedidos', '_blank')}
                >
                    Ir a pedidos
                </button>
                <button
                    style={{
                        borderRadius: 20,
                        margin: 16,
                        width: 160,
                        minHeight: 200,
                        maxHeight: 200,
                        boxShadow: "5px 5px 30px -5px rgba(0,0,0,0.75)",
                        backgroundColor: "#fafafa",
                    }}
                    onClick={() => window.open('/registrarPedidos', '_blank')}
                >
                    Realizar pedido
                </button>
                <button
                    style={{
                        borderRadius: 20,
                        margin: 16,
                        width: 160,
                        minHeight: 200,
                        maxHeight: 200,
                        boxShadow: "5px 5px 30px -5px rgba(0,0,0,0.75)",
                        backgroundColor: "#fafafa",
                    }}
                    onClick={() => window.open('/pedidoAPreparar', '_blank')}
                >
                    Pedidos a preparar
                </button>
                <button
                    style={{
                        borderRadius: 20,
                        margin: 16,
                        width: 160,
                        minHeight: 200,
                        maxHeight: 200,
                        boxShadow: "5px 5px 30px -5px rgba(0,0,0,0.75)",
                        backgroundColor: "#fafafa",
                    }}
                    onClick={() => window.open('/AlertaPedidos', '_blank')}
                >
                    Alerta pedidos
                </button>
            </div>
        </>
    )
}
