// src/Routes/routes.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "../pages/home/Home";
import { Galeria } from "../pages/galeria/Galeria";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Galeria />} />
      </Routes>
    </BrowserRouter>
  );
}
