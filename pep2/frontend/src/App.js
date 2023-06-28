import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Component } from "react";
import NavbarComponent from "./components/NavbarComponent";
import GlobalStyle from "./services/globalStyles";
import ProveedorComponent from "./components/ProveedorComponent";
import CreateProveedorComponent from "./components/CreateProveedorComponent";


function App() {
  return (
    <div>
      <BrowserRouter>
        <NavbarComponent />
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<ProveedorComponent />} />
          <Route path="/add-proveedor" element={<CreateProveedorComponent />} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
