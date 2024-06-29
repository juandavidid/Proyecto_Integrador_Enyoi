// Importar estilos
import "./navbar.css"


// Declaro una funcion componente
const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navContainer">
                {/*Agrego un logo tipo */}
                <span className="logo">lamabooking</span>
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