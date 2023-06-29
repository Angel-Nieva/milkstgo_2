import React, {Component} from "react";
import styled from "styled-components";
import GrasaSolidoService from "../services/GrasaSolidoService";

class GrasaSolidoComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            grasaSolidos: [],
        };
    }

    renderList = () => {
        if (!Array.isArray(this.state.grasaSolidos)) {
            return null; // or render an appropriate loading/error message
        }

        return this.state.grasaSolidos.map((grasaSolido) => (
            <tr key={grasaSolido.id}>
              <td>{grasaSolido.id}</td>
              <td>{grasaSolido.proveedor}</td>
              <td>{grasaSolido.grasa}</td>
              <td>{grasaSolido.solido}</td>
            </tr>
          ));
    }

    componentDidMount(){
        GrasaSolidoService.getGrasaSolido().then((res) => {
            this.setState({ grasaSolidos: res.data});
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
                                    <thead className="thead">
                                        <tr>
                                            <th>ID</th>
                                            <th>PROVEEDOR</th>
                                            <th>GRASA</th>
                                            <th>SOLIDO</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {  this.renderList()}
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

export default GrasaSolidoComponent;

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
    
    .table-wrapper {
        height: fit-content;
        max-height: 66.4vh;
        margin-top: 22px;
        margin: 15px;
        padding-bottom: 20px;
        overflow-y: scroll;
        background-color:   white ;
        overflow-x: auto;
        border:  2px solid;
    }

    .thead{
        position: sticky;
        top: 0;
        background-color:   blue ;
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
        font-size: 15px;
        border: 1px solid black;
        outline: 0.7px solid black;
        padding-left: 30px;
    }
    
`