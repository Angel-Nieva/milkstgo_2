import React, { useState } from 'react'
import ProveedorService from '../services/ProveedorService';
import styled from "styled-components";
import swal from 'sweetalert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function CreateProveedorComponent(props) {

    const initialState = {
        id: "",
        codigo: "",
        nombre: "",
        categoria: "",
        retencion: ""
    };

    const [input, setInput] = useState(initialState);

    const changeCodigoHandler = event => {
        setInput({ ...input, codigo: event.target.value });
    };

    const changeNombreHandler = event => {
        setInput({ ...input, nombre: event.target.value });
        console.log(input.nombre);
    };

    const changeCategoriaHandler = event => {
        setInput({ ...input, categoria: event.target.value });
        console.log(input.categoria);
    };

    const changeRetencionHandler = event => {
        setInput({ ...input, retencion: event.target.value });
        console.log(input.retencion);
    };

    const ingresarProveedor = e => {
        e.preventDefault();
        swal({
            title: "¿Está seguro de que desea ingresar un proveedor?",
            text: "Una vez creado, no podrá ser modificado.",
            icon: "warning",
            buttons: ["Cancelar", "Enviar"],
            dangerMode: true
        }).then(respuesta=>{
            if(respuesta){
                swal("Proveedor creado correctamente!", {icon: "success", timer: "3000"});
                let proveedor = { codigo: input.codigo, nombre: input.nombre, 
                                  categoria: input.categoria, retencion: input.retencion};
                console.log("proveedor => " + JSON.stringify(proveedor));
                ProveedorService.createProveedor(proveedor).then(
                    (res) => {
                    }
                  );
                }
            else{
                swal({text: "Proveedor no enviado.", icon: "error"});
            }
        });
    };

    return(
        <Styles>
        <div>        
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="col-lg-g col-md-5 col-sm-6 container justify-content-center card">
                        <h1 className="text-center">Registrar proveedor</h1>
                        <div className="card-body"> 
                            <Form>
                                <Form.Group className="mb-3" controlId="id" value = {input.codigo} onChange={changeCodigoHandler}>
                                    <Form.Label>Codigo:</Form.Label>
                                    <Form.Control type="codigo" placeholder="Ingrese el código del proveedor" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="id" value = {input.nombre} onChange={changeNombreHandler}>
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control type="nombre" placeholder="Ingrese el nombre del proveedor"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="id" value = {input.categoria} onChange={changeCategoriaHandler}>
                                    <Form.Label>Categoria:</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Seleccione una categoría:</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="id" value = {input.retencion} onChange={changeRetencionHandler}>
                                    <Form.Label>Retencion:</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Seleccione retencion</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                            <div className="contenedor-button">
                                <Button  className="boton" onClick={ingresarProveedor}>Registrar Proveedor</Button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>            
        </div>
        </Styles>
    )
}

const Styles = styled.div`
    .contenedor-button{   
        display: flex;
        justify-content: center;
    }
    
`
