// Importar estilos
import { useContext } from "react";
import "./navbar.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";


// Declaro una funcion componente
const Navbar = () => {

    const { user, dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <div className="navbar">
            <div className="navContainer">

                <Link to="/" style={{ color: "inherit", textDecoration: "none" }} >
                    {/*Agrego un logo tipo */}
                    <span className="logo">lamabooking</span>
                </Link>

                {/* Agrego botones Registro y Login */}
                {user ? (
                    <div>
                        <span>{user.username}</span>
                        <button className="navButton" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    </div>
                ) : (
                    <div className="navItems">
                        <Link to="/register">
                            <button className="navButton">Registro</button>
                        </Link>

                        <Link to="/Login">
                            <button className="navButton">Login</button>
                        </Link>

                    </div>)
                }
            </div>
        </div>
    )
}

export default Navbar