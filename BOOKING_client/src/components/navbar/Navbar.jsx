// Importar estilos
import { useContext } from "react";
import "./navbar.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import DropdownMenu from "../dropdownmenu/DropdownMenu.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import MyIcon from '../../img/mundo.png'



// Declaro una funcion componente
const Navbar = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }} >
                    {/*Agrego un logo tipo */}
                    <span className="logo" style={{ fontSize: '30px' }}>Booking.com</span>
                </Link>

                {/* Agrego botones Registro y Login */}
                {user ? (

                    < div >
                        <span className="textCop">COP</span>
                        <img className="iconBanderaColombia" src={MyIcon} alt="My Icon" />
                        <FontAwesomeIcon className="textQuestion" icon={faCircleQuestion} />

                        <span className="textRegister">Register Your Property</span>

                        <FontAwesomeIcon className="iconUser" icon={faUser} />
                        <DropdownMenu />
                    </div>
                ) : (
                    <div className="navItems">

                        <span className="textCop">COP</span>

                        <img className="iconBanderaColombia" src={MyIcon} alt="My Icon" />

                        <FontAwesomeIcon className="textQuestion" icon={faCircleQuestion} />
                        <span>Register Your Property</span>
                        <Link to="/register">
                            <button className="navButton">Sing Up</button>
                        </Link>

                        <Link to="/Login">
                            <button className="navButton">Login In</button>
                        </Link>

                    </div>)
                }
            </div>
        </div >
    )
}

export default Navbar