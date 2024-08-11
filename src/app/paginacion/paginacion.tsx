import { FormControl, Grid, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { BootstrapInput } from "../utils/customInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
interface IPaginacion {
    cantidadFilasPorPagina: number;
    cantidadPaginas: number;
    paginaSeleccionada: number;
    setCantidadFilasPorPagina: Dispatch<SetStateAction<number>>;
    setPaginaSeleccionada: Dispatch<SetStateAction<number>>;
}
export default function Paginacion(props: IPaginacion) {
    const {
        cantidadFilasPorPagina,
        cantidadPaginas,
        paginaSeleccionada,
        setCantidadFilasPorPagina,
        setPaginaSeleccionada } = props;


    const handleChangePags = (ev: SelectChangeEvent) => {
        console.log("ev ", ev);
        setPaginaSeleccionada(1);
        setCantidadFilasPorPagina(parseInt(ev.target.value))
    }
    const handleChangeNumeroPagina = (_: any, value: number) => {
        console.log("value ", value)
        setPaginaSeleccionada(Number(value));
    }
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                marginTop: "1rem",
                justifyContent: "flex-end"
            }}
        >
            <Grid item xs={6.5} md={1.5} xl={2}>
                <Typography style={{ fontSize: 12, color: "#00519b" }}>
                    Items por página:
                </Typography>
            </Grid>
            <Grid item xs={3} md={1.5} xl={1}>
                <FormControl>
                    <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={String(cantidadFilasPorPagina)}
                        onChange={handleChangePags}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={60}>60</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid>
                <Pagination
                    count={cantidadPaginas}
                    page={paginaSeleccionada}
                    onChange={handleChangeNumeroPagina}
                    renderItem={(item) => (
                        <PaginationItem
                            components={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                            }}
                            {...item}
                        />
                    )}
                />
            </Grid>
        </div>)

}