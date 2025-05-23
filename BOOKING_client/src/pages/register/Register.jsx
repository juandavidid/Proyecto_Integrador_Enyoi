import "./register.css"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { userInputs } from "../../formSource";

import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { Link, useNavigate } from 'react-router-dom';

import MessagesRegister from "./messagesRegister/MessagesRegister";



const Register = () => {


  const { loading, error, dispatch } = useContext(AuthContext);


  const [openModal, setOpenModal] = useState(false);
  const [info, setInfo] = useState({});

  const navigate = useNavigate();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {

    e.preventDefault();

    try {

      // Registrar Usuario

      await axios.post("/api/auth/register", info);

      setOpenModal(true);

      console.log("Usuario registrado exitosamente:", info);


      // Iniciar sesión automáticamente
      dispatch({ type: "LOGIN_START" });
      const res = await axios.post("/api/auth/login", {
        username: info.username,
        password: info.password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

      setTimeout(() => {

        navigate('/'); // Redirige a la página principal después de 2 segundos
      }, 2000);

      // INICIAR SESION USUARIO




    } catch (err) {

      console.error("Error al registrar el usuario:", err);
    }
  };


  return (
    <div >
      <div>
        <nav className="navlogin">
          <span className="logo" style={{ fontSize: '25px' }}>Booking.com</span>
          <div>
            <FontAwesomeIcon className="iconSingIn" icon={faSignInAlt} />
            <FontAwesomeIcon className="textQuestion" icon={faCircleQuestion} />

          </div>

        </nav>
      </div>
      <div className="newUserContainer">
        <h1>Create Your Account</h1>
        <form >
          {userInputs.map((input) => (
            <div className="formInput" key={input.id}>
              <label>{input.label}</label>
              <input
                onChange={handleChange}
                type={input.type}
                placeholder={input.placeholder}
                id={input.id}
              />
            </div>
          ))}
          <Link to={"/"}>
            <button className="Btn_Register" onClick={handleClick}>Registrar</button>
          </Link>

        </form>

      </div>


      {openModal && <MessagesRegister />}

      <div className="text-container">
        <p>
          Al iniciar sesión o al crear una cuenta, aceptas nuestros Términos y
        </p>
        <p>
          condiciones y la Política de privacidad.
        </p>
        <p>
          Todos los derechos reservados. Copyright (2006 - 2024) - Booking.com™
        </p>
        <p>
          Copyright (2006 - 2024) - Booking.com™

        </p>
      </div>

    </div>

  )
}


export default Register;