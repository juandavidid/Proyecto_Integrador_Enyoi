// Importar estilos
import "./navbar.css"
import { Link } from "react-router-dom"


// Declaro una funcion componente
const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }} >
                    {/*Agrego un logo tipo */}
                    <span className="logo">lamabooking</span>
                </Link>
                {/* Agrego botones Registro y Login */}
                <div className="navItems">
                    <button className="navButton">Register</button>
                    <button className="navButton">Login</button>
                </div>

            </div>
        </div>
    )
}


export default Navbar