import React, {Component} from "react";
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'
import img from '../banner-img.jpg';

class IndexComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            proveedores: [],
        };
    }

    componentDidMount(){
        fetch("http://localhost:8082/proveedor")
        .then((response) => response.json())
        .then((data) => this.setState({ proveedores: data }));
    }

    render(){
        return (          
            <div>
                <GlobalStyle/>
                <Styles>
                <body>
                    <br></br>
                    <div class="container d-flex justify-content-center">
                        <div class="outer-wrapper ">
                            <div class="table-wrapper">
                                <table>
                                    <thead class="thead-dark">
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
                </body>
                </Styles>    
            </div>
            
        )
    }

}

export default IndexComponent; 

const GlobalStyle = createGlobalStyle`
    body {
        background-image: url(${img});
        background-size: cover;
        min-height: 100vh;
    }
`

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