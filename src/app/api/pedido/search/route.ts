import { connectMongoDB } from "@/libs/mongodb";
import Pedido from "@/models/pedido";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    await connectMongoDB();
    let filasNumeroPaginado = request.url?.slice(request.url?.indexOf('f'), request.url.length)?.split('&');
    let numeroPagina = Number(filasNumeroPaginado[1]?.split('=')[1]);
    let filasPaginado = Number(filasNumeroPaginado[0]?.split('=')[1]);

    let nombreCliente = request.url.split('=')[3];
    let pedidoBuscado: any;
    if (nombreCliente !== "1" && nombreCliente !== "15&numeroPagina" && request.url?.split('=')[2] !== "Listo" && request.url?.split('=')[2] !== "Preparar") {
        nombreCliente = String(nombreCliente).toUpperCase();
        pedidoBuscado = await Pedido.find({ nombre: nombreCliente }).sort({ nombre: 1 });
    } else {
        let numeroPedido = await request.url?.split('=')[1];
        numeroPedido = numeroPedido?.slice(0, numeroPedido?.indexOf('&'))
        if (numeroPedido?.indexOf('&') !== -1) {
            numeroPedido = numeroPedido?.slice(0, numeroPedido?.indexOf('&'))
        }
        numeroPedido = numeroPedido.trim();
        let estado = request.url?.split('=')[2]
        if (estado === "Listo" && isNaN(numeroPagina) && isNaN(filasPaginado)) {

            pedidoBuscado = await Pedido.find({ estado: estado }).sort({ numeroPedido: 1 }).limit(7)
        } else {
            if (estado === "Preparar" && isNaN(numeroPagina) && isNaN(filasPaginado)) {
                pedidoBuscado = await Pedido.find({ estado: estado }).sort({ numeroPedido: 1 }).limit(7)
            } else {
                estado = estado?.slice(0, estado?.indexOf('&'))

                let convertirEntero = numeroPedido?.includes("&") || numeroPedido?.includes(' ') ? -1 : Number(numeroPedido);
                if (estado == "15" && convertirEntero == 0) {
                    pedidoBuscado = await Pedido.find().sort({ numeroPedido: 1 })
                }
                if (convertirEntero === 0 && estado != "15" && estado !== undefined) {
                    pedidoBuscado = await Pedido.find({ estado: estado }).sort({ numeroPedido: 1 })
                }
                if (estado === undefined && convertirEntero === 0) {
                    pedidoBuscado = await Pedido.find().sort({ numeroPedido: 1 })

                }
                if (estado != "15" && convertirEntero !== 0) {
                    pedidoBuscado = await Pedido.find({ numeroPedido: numeroPedido, estado: estado }).sort({ numeroPedido: 1 })
                }
                if (convertirEntero !== 0 && estado == "15") {
                    pedidoBuscado = await Pedido.find({ numeroPedido: numeroPedido }).sort({ numeroPedido: 1 })
                }
            }
        }
    }

    const desde = filasPaginado * (numeroPagina - 1);
    const hasta = filasPaginado * (numeroPagina - 1) + filasPaginado;
    let cantidadPaginas: number = 0;
    cantidadPaginas = filasPaginado > 0 ? Math.ceil(pedidoBuscado.length / filasPaginado) : 0;
    let cantidadPedidos: number = pedidoBuscado?.length > 0 ? Number(pedidoBuscado.length) : 0;

    /*
      if (!Number.isNaN(desde) && !Number.isNaN(hasta)) {
          pedidoBuscado = pedidoBuscado?.slice(desde, hasta)
      }
          */
    return NextResponse.json(
        { Pedido: pedidoBuscado, cantidadPaginas: cantidadPaginas, cantidadPedidos: cantidadPedidos, message: pedidoBuscado?.length == 1 ? 'Pedido encontrado' : 'Pedidos encontrados' }, { status: 200 }
    )
}