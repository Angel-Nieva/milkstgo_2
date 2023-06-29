import React, {Component} from "react";
import styled from "styled-components";
import ReporteService from "../services/ReporteService";

class ReporteComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            reportes: [],
        };
    }

    componentDidMount(){
        ReporteService.getReportes().then((res) => {
            this.setState({ reportes: res.data});
        });
    }


    render(){
        return (          
            <div>
                <Styles>
                    <br></br>
                        <div className="outer-wrapper ">
                            <div className="table-wrapper-scroll">
                                <table>
                                    <thead className="thead">
                                        <tr>
                                            <th>QUINCENA </th>
                                            <th>CÓDIGO</th>
                                            <th>NOMBRE</th>
                                            <th>KLS LECHE</th>
                                            <th>DIAS ENVIOS</th>
                                            <th>PROMEDIO LECHE</th>
                                            <th>VARIACION LECHE</th>
                                            <th>GRASA</th>
                                            <th>VARIACIÓN GRASA</th>
                                            <th>SOLIDOS TOTALES</th>
                                            <th>VARIACION ST</th>
                                            <th>PAGO LECHE</th>
                                            <th>PAGO GRASA</th>
                                            <th>PAGO ST</th>
                                            <th>BONIFICACIÓN FRECUENCIA</th>
                                            <th>DCTO. LECHE</th>
                                            <th>DCTO. GRASA</th>
                                            <th>DCTO. ST</th>
                                            <th>PAGO TOTAL</th>
                                            <th>MONTO RETENCIÓN</th>
                                            <th>MONTO FINAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.reportes.map((reporte) => (
                                            <tr key={reporte.id} >
                                                <td>{reporte.quincena}</td>
                                                <td>{reporte.codigo_proveedor}</td>
                                                <td>{reporte.nombre_proveedor}</td>
                                                <td>{reporte.kls_leche}</td>
                                                <td>{reporte.diasEnvioLeche}</td>
                                                <td>{reporte.avgKls_leche}</td>
                                                <td>{reporte.variacion_leche}</td>
                                                <td>{reporte.grasa}</td>
                                                <td>{reporte.variacion_grasa}</td>
                                                <td>{reporte.solidos_totales}</td>
                                                <td>{reporte.variacion_st}</td>
                                                <td>{reporte.pago_leche}</td>
                                                <td>{reporte.pago_grasa}</td>
                                                <td>{reporte.pago_st}</td>
                                                <td>{reporte.bonificacion_frecuencia}</td>
                                                <td>{reporte.dct_leche}</td>
                                                <td>{reporte.dct_grasa}</td>
                                                <td>{reporte.dct_st}</td>
                                                <td>{reporte.pago_total}</td>
                                                <td>{reporte.monto_retencion}</td>
                                                <td>{reporte.monto_final}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                
                </Styles>    
            </div>
            
        )
    }

}

export default ReporteComponent; 

const Styles = styled.div`

    .outer-wrapper {
        margin: 10px;
        margin-left: 40px;
        border: 2px solid black;
        border-radius: 10px ;
        box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.9);
        max-width: fit-content;
        max-height: fit-content;
    }
        
    .table-wrapper-scroll{
        overflow-y: scroll;
        overflow-x: scroll;
        height: fit-content;
        max-height: 66.4vh;
        margin-top: 22px;
        margin: 15px;
        padding-bottom: 20px;
        background-color:   white ;
    }

    .thead{
        position: sticky;
        top: 0;
        background-color:   blue ;
    }
    
    table {
        min-width: max-content;
        border-collapse: separate;
        border-spacing: 0px;
    }
    
    table th {
        position: sticky;
        top: 0px;
        background-color:   white ;
        color: black;
        opacity: 0.9;
    
        text-align: center;
        font-weight: normal;
        font-size: 18px;
        outline: 0.7px solid black;
        border: 1.5px solid black;
    }
    
    table th, table td {
    
        padding: 15px;
        padding-top: 10px;
        padding-bottom: 10px;
    
    }
    
    table td {
        text-align: left;
        background-color:   white ;
        font-size: 15px;
        border: 1px solid black;
        outline: 0.7px solid black;
        padding-left: 30px;
    }
    
`