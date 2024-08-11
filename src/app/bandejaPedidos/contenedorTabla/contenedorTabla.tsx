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
    setPaginaSeleccionada: Dispatch<SetStateAction<number>>

}) {

    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    width: "91%",
                    translate: "6%",
                }}
            >
            </Box>
            <Typography sx={{ translate: "7%" }}>
                <b>Pedidos</b>
            </Typography>
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
                        />
                    )
                )}
            </Tablas>

        </Box>

    )
}