import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function NavbarComponent(){
    return(
        <>
            <NavStyle>
                
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container">
                            <Link className="navbar-brand text-white" to="/">MilkStgo 2023</Link>

                            <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarNav"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>


                            <div className="collapse navbar-collapse" id="navbarNav">
                                <div className="mx-auto"></div>
                                <ul className="navbar-nav">

                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle text-white" href="/#"
                                            role="button" aria-expanded="false"
                                        data-bs-toggle="dropdown"  > Proveedores </a>
                                        <ul className="dropdown-menu" >
                                            <li>
                                                <Link className="dropdown-item" to="/"> Listar proveedores</Link>                                            
                                                <Link className="dropdown-item" to="/add-proveedor"> Nuevo Proveedor</Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle text-white" href="/#"
                                        role="button" aria-expanded="false"
                                        data-bs-toggle="dropdown" > Acopios </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link className="dropdown-item" to="/acopio"> Listar Acopios</Link>
                                                <Link className="dropdown-item" to="/fileUpload-acopio"> Subir Archivo</Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle text-white" href="/#"
                                            role="button" aria-expanded="false"
                                        data-bs-toggle="dropdown" > Grasas y Solidos </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link className="dropdown-item" to="/grasa-solido"> Listar Grasa y ST</Link>
                                                <Link className="dropdown-item" to="/fileUpload-grasa"> Subir Archivo</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle text-white" href="/#"
                                        role="button" aria-expanded="false"
                                        data-bs-toggle="dropdown" > Reportes </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link className="dropdown-item" to="/reporte"> Planilla de pagos</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                
            </NavStyle>
        </>
    )
}

export default NavbarComponent;

const NavStyle = styled.nav`
.navbar {
    background-color: black !important;
}
 
`
