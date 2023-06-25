import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Component } from "react";
import NavbarComponent from "./components/NavbarComponent";
import IndexComponent from "./components/IndexComponent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
        <Route path="/" element={<IndexComponent />} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
