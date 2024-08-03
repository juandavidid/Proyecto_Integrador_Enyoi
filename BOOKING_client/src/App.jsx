
import { BrowserRouter, Routes, Route } from "react-router-dom";


// Importamos las Rutas
import Home from './pages/home/Home'
import List from './list/List'
import Hotel from './hotel/Hotel'
import Login from "./pages/login/Login"
function App() {
  return (
    //Componente que permite Envolver todo una sola pagina
    <BrowserRouter>
      <Routes>
        {/*Declaro La Rutas */}
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        {/*Se coloca id en la ruta para identificacion unica al hotel*/}
        <Route path="/hotels/:id" element={<Hotel />} />
        {/*Ruta de login */}
        <Route path="/login" element={<Login />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
