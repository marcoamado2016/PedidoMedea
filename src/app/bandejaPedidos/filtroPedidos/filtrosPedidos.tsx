import { Dispatch, SetStateAction, useState } from "react";
import {
    Grid,
    TextField,
    AccordionSummary,
    Accordion,
    Button,
    Select,
    MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function FiltroPedidos(props: {
    setNumeroPedido: Dispatch<SetStateAction<number>>
    numeroPedido: number;
    obtenerPedidos: any;
    value: number;
    estado: string,
    setEstado: Dispatch<SetStateAction<string>>
    nombreCliente: string;
    setNombreCliente: Dispatch<SetStateAction<string>>;
}) {

    const [expandedAcordion, setExpandedAcordion] = useState<boolean>(false);
    const [isDisable, setIsDisable] = useState<boolean>(false);
    const handleChange = (isExpanded: boolean) => {
        setExpandedAcordion(isExpanded);
    }
    const onchangeNumeroPedido = (e: any) => {
        let numeroPedido = e.target.value;
        props.setNumeroPedido(numeroPedido);
    }
    const onchangeEstado = (e: any) => {
        props.setEstado(e.target.value);
    }
    const onClickBuscar = () => {
        props.obtenerPedidos(props.numeroPedido, props.estado, props.nombreCliente)
        setIsDisable(false);
    }
    const buscarTodosLosPedidos = () => {
        props.setEstado("");
        props.setNombreCliente("");
        props.setNumeroPedido(0);
        setIsDisable(false);
        props.obtenerPedidos(0, "", "")

    }
    const onchangeNombrePedido = (e: any) => {
        props.setNombreCliente(e.target.value);
        if (e.target.value?.length > 0) {
            props.setEstado("");
            props.setNumeroPedido(0);
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
        console.log("isDisable ", isDisable)
    }
    const limpiparFiltros = () => {
        props.setEstado("");
        props.setNombreCliente("");
        props.setNumeroPedido(0);
        setIsDisable(false);
    }
    return (
        <div style={{ margin: "2em", paddingLeft: "1em" }}>
            <Accordion
                expanded={expandedAcordion}
                onChange={(event, isExpanded) => handleChange(isExpanded)}
                style={{ padding: "1em" }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    {expandedAcordion ? (
                        <div
                            style={{
                                fontSize: 15,
                                paddingLeft: 30,
                            }}
                        >
                            <p>OCULTAR FILTROS</p>
                        </div>
                    ) : <div
                        style={{
                            fontSize: 15,
                            paddingLeft: 30,
                        }}
                    >
                        <p>MOSTRAR FILTROS</p>
                    </div>
                    }
                </AccordionSummary>

                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            label="numeroPedido"
                            value={props.numeroPedido}
                            onChange={onchangeNumeroPedido}
                            inputProps={{
                                inputMode: "text",
                            }}
                            fullWidth
                            disabled={isDisable}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Select
                            label="estado"
                            value={props.estado}
                            onChange={onchangeEstado}
                            fullWidth
                            disabled={isDisable}
                        >
                            <MenuItem value="">Seleccionar un estado</MenuItem>
                            <MenuItem value="Cancelado">Cancelado</MenuItem>
                            <MenuItem value="Preparar">A Preparar pedido</MenuItem>
                            <MenuItem value="Listo">Listo</MenuItem>
                            <MenuItem value="Entregado">Entregado</MenuItem>
                        </Select>

                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="nombre cliente"
                            value={props.nombreCliente}
                            onChange={onchangeNombrePedido}
                            inputProps={{
                                inputMode: "text",
                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>

            </Accordion>
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                style={{ marginTop: "1em" }}
                columnSpacing={2}
            >
                <Grid item>
                    <Button
                        variant="contained"
                        color="success"
                        style={{
                            backgroundColor: "#4caf50", // Un tono verde
                            boxShadow: "1px 11px 16px -10px rgba(0,0,0,0.75)",
                            marginRight: "1vw",
                            color: "#ffffff", // Para el texto en blanco
                        }}
                        onClick={buscarTodosLosPedidos}
                    >
                        Buscar todos los pedidos
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="success"
                        style={{
                            backgroundColor: "#4caf50", // Un tono verde
                            boxShadow: "1px 11px 16px -10px rgba(0,0,0,0.75)",
                            marginRight: "1vw",
                            color: "#ffffff", // Para el texto en blanco
                        }}
                        onClick={limpiparFiltros}
                    >
                        Limpiar filtros
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="success"
                        style={{
                            backgroundColor: "#4caf50", // Un tono verde
                            boxShadow: "1px 11px 16px -10px rgba(0,0,0,0.75)",
                            marginRight: "1vw",
                            color: "#ffffff", // Para el texto en blanco
                        }}
                        onClick={onClickBuscar}
                    >
                        Buscar
                    </Button>
                </Grid>
            </Grid>
        </div>
    )

}