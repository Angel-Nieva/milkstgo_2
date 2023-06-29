import React, { Component } from "react";
import swal from 'sweetalert';
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import GrasaSolidoService from "../services/GrasaSolidoService";


class FileUploadGrasaSolidoComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
        file: null,
        };
    this.onFileChange = this.onFileChange.bind(this);
  }

  onFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  onFileUpload = () => {
    swal({
      title: "¿Está seguro de que desea cargar el archivo de texto?",
      text: "Tenga en cuenta que el archivo solo será cargado si su nombre es 'Grasas.txt' y si su formato es correcto.",
      icon: "warning",
      buttons: ["Cancelar", "Cargar"],
      dangerMode: true
    }).then(respuesta=>{
      if(respuesta){
        swal("Archivo cargado correctamente!", {icon: "success", timer: "3000"});
        const formData = new FormData();
        formData.append("file", this.state.file);
        GrasaSolidoService.CargarArchivo(formData).then((res) => {
        });
      }
      else{
        swal({text: "Archivo no cargado.", icon: "error"});
      }
    });
  };

  render(){
    return(
        <Styles>
        
        <div>
            <div className="f">
              <div className="container-fileUpload">
                    <h1><b>Cargar el archivo con el %</b></h1>
                    <h1><b>Grasa y Solidos</b></h1>
                    <hr />
                    <Form.Group className="mb-3" controlId="formFileLg">
                        <Form.Control type="file" size="lg" onChange={this.onFileChange} />
                    </Form.Group>
                    <hr />
                    <div className="contenedor-button">
                      <Button varian="primary" onClick={this.onFileUpload}>
                      Cargar el archivo a la Base de Datos
                      </Button>
                    </div>
                  
              </div>   
            </div>
            <hr />
            <div className = "form1">
                <h5><b className = "texto">Recuerde que debe cargar un archivo Excel de extensión .csv!</b></h5>
            </div> 
        </div>
        </Styles>
    )
  }

}
export default FileUploadGrasaSolidoComponent;

const Styles = styled.div`
  .container-fileUpload{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2%;
  }
  .f{
    margin-top: 40px;
    border: 3px solid rgb(162, 161, 161);
    padding: 40px;
    padding-top: 10px;
    border-radius: 40px;
    margin-left: 300px;
    margin-right: 300px;
    background-color:   white;
  }

  .form1{
    border: 1px solid rgb(82, 82, 173);
    padding: 30px;
    border-radius: 30px;
    margin-left: 300px;
    margin-right: 300px;
    background-color:   white;
    display: flex;
    justify-content: center;
  }


`