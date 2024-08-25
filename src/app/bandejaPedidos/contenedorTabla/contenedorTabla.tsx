'use client'
import React, { Dispatch, SetStateAction } from "react";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Loader } from "@/components/Loader";
import TablaPedidos from "../tablaPedidos/tablaPedidos";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function Tablas(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export default function ContenedorTabla(props: {
    datosTabla: any[];
    setCargandoDatos: Dispatch<SetStateAction<boolean>>;
    cargandoDatos: boolean;
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
    filasPaginado: number;
    setfilasPaginado: Dispatch<SetStateAction<number>>;
    numeroPaginado: number;
    setNumeroPaginado: Dispatch<SetStateAction<number>>
    paginaSeleccionada: number;
    estado:string
    setEstado: Dispatch<SetStateAction<string>>;
    setPaginaSeleccionada: Dispatch<SetStateAction<number>>
    nombreCliente: string;
    setNombreCliente: Dispatch<SetStateAction<string>>;
}) {

    return (
        <Box sx={{ width: "100%" }} style={{ marginTop: "1em" }}>

            <Tablas key={0} value={props.value} index={0}>
                {props.cargandoDatos ? (
                    <div style={{ textAlign: "center", paddingTop: "5%" }}>
                        <Loader />
                    </div>
                ) : (
                    props.datosTabla && (
                        <TablaPedidos
                            datosTabla={props.datosTabla}
                            value={props.value}
                            filasPaginado={props.filasPaginado}
                            setfilasPaginado={props.setfilasPaginado}
                            numeroPaginado={props.numeroPaginado}
                            setNumeroPaginado={props.setNumeroPaginado}
                            paginaSeleccionada={props.paginaSeleccionada}
                            setPaginaSeleccionada={props.setPaginaSeleccionada}
                            estado={props.estado}
                            setEstado={props.setEstado}
                            nombreCliente={props.nombreCliente}
                            setNombreCliente={props.setNombreCliente}
                        />
                    )
                )}
            </Tablas>

        </Box>

    )
}