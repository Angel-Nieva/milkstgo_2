import React, {Component} from "react";
import styled from "styled-components";
import ProveedorService from "../services/ProveedorService";

class ProveedorComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            proveedores: [],
        };
    }

    componentDidMount(){
        ProveedorService.getProveedores().then((res) => {
            this.setState({ proveedores: res.data});
        });
    }


    render(){
        return (          
            <div>
                <Styles>
                    <br></br>
                    <div className="container d-flex justify-content-center">
                        <div className="outer-wrapper ">
                            <div className="table-wrapper">
                                <table>
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>Codigo</th>
                                            <th>Nombre</th>
                                            <th>Categoria</th>
                                            <th>Retencion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.proveedores.map((proveedor) => (
                                            <tr key={proveedor.id} >
                                                <td>{proveedor.id}</td>
                                                <td>{proveedor.codigo}</td>
                                                <td>{proveedor.nombre}</td>
                                                <td>{proveedor.categoria}</td>
                                                <td>{proveedor.retencion}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                
                </Styles>    
            </div>
            
        )
    }

}

export default ProveedorComponent; 

const Styles = styled.div`

    .outer-wrapper {
        margin: 10px;
        margin-left: 20px;
        margin-right: 20px;
        border: 1px solid black;
        border-radius: 4px;
        box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.9);
        max-width: fit-content;
        max-height: fit-content;
    }
    
    .table-wrapper {
        height: fit-content;
        max-height: 66.4vh;
        margin-top: 22px;
        margin: 15px;
        padding-bottom: 20px;
        overflow-y: scroll;
    }
    
    .table-wrapper-scroll{
        overflow-y: scroll;
        overflow-x: scroll;
        height: fit-content;
        max-height: 66.4vh;
        margin-top: 22px;
        margin: 15px;
        padding-bottom: 20px;
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
        opacity: 0.7;
        font-size: 15px;
        border: 1px solid black;
        outline: 0.7px solid black;
        padding-left: 20px;
    }
    
`