import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import GlobalStyle from "./services/globalStyles";
import ProveedorComponent from "./components/ProveedorComponent";
import CreateProveedorComponent from "./components/CreateProveedorComponent";
import FileUploadAcopioComponent from "./components/FileUploadAcopioComponent";
import AcopioComponent from "./components/AcopioComponent";
import GrasaSolidoComponent from "./components/GrasaSolidoComponent";
import FileUploadGrasaSolidoComponent from "./components/FileUploadGrasaSolidoComponent";
import ReporteComponent from "./components/ReporteComponent";


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
          <Route path="/grasa-solido" element={<GrasaSolidoComponent />} />
          <Route path="/fileUpload-grasa" element={<FileUploadGrasaSolidoComponent />} />
          <Route path="/reporte" element={<ReporteComponent />} />
          
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
