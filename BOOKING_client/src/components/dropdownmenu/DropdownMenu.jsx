import './dropdownmenu.css'
import { useState, useEffect, useRef } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faSuitcase } from '@fortawesome/free-solid-svg-icons';


const DropdownMenu = () => {


    const { user, dispatch } = useContext(AuthContext);

    const dropdownRef = useRef(null);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        setIsOpen(false);

    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    /*
    const closeMenu = () => {
        setIsOpen(false);
    };
    */

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);



    return (
        <div className="dropdown" ref={dropdownRef}>


            <div className="textUsuario">
                <span style={{ fontSize: '20px' }} onClick={toggleMenu}> ¡ Hola {user.username} ! </span>
            </div>

            {isOpen && (
                <ul className="dropdown-menu">
                    <Link to={"/userReservations"}>
                        <li onClick={() => setIsOpen(false)}  ><a href="#terms"><FontAwesomeIcon icon={faSuitcase} /> Reservas</a></li>
                    </Link>

                    <Link to={"/"}>
                        <li onClick={handleLogout}><a href="#logout">  <FontAwesomeIcon icon={faRightToBracket} />  Cerrar sesión</a></li>
                    </Link>


                </ul>
            )
            }
        </div >

    )
}

export default DropdownMenu;