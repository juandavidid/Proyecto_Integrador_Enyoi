// Importar estilos
import { useContext } from "react";
import "./navbar.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";


// Declaro una funcion componente
const Navbar = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }} >
                    {/*Agrego un logo tipo */}
                    <span className="logo">lamabooking</span>
                </Link>
                {/* Agrego botones Registro y Login */}
                {user ? user.username : (
                    <div className="navItems">
                        <button className="navButton">Register</button>
                        <button className="navButton">Login</button>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Navbar