'use client'
import React, { Dispatch, SetStateAction, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Loader } from "@/components/Loader";
import TablaPedidos from "../tablaPedidos/tablaPedido";
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

}) {

    const { cargandoDatos, datosTabla, setCargandoDatos, setValue, value } = props;
    useEffect(() => {
        if (props.cargandoDatos) {
            const timer = setInterval(() => {
                setCargandoDatos(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [datosTabla, cargandoDatos])
    return (
        <Box sx={{ width: "100%", height: "calc(100% - 3em)" }}>
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
                <b>Estados de pedidos</b>
            </Typography>
            <Tablas key={0} value={value} index={0}>
                <TablaPedidos
                    datosTabla={datosTabla}
                    value={value}
                />
            </Tablas>

        </Box>

    )
}