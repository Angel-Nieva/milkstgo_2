import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Component } from "react";
import NavbarComponent from "./components/NavbarComponent";
import GlobalStyle from "./services/globalStyles";
import ProveedorComponent from "./components/ProveedorComponent";
import CreateProveedorComponent from "./components/CreateProveedorComponent";
import FileUploadAcopioComponent from "./components/FileUploadAcopioComponent";
import AcopioComponent from "./components/AcopioComponent";


function App() {
  return (
    <div>
      <BrowserRouter>
        <NavbarComponent />
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<ProveedorComponent />} />
          <Route path="/add-proveedor" element={<CreateProveedorComponent />} />
          <Route path="/fileUpload-acopio" element={<FileUploadAcopioComponent />} />
          <Route path="/acopio" element={<AcopioComponent />} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
