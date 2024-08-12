import "./register.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { userInputs } from "../../formSource";

import axios from "axios";



import { Link, useNavigate } from 'react-router-dom';
import MessagesRegister from "../../pages/register/messagesRegister/MessagesRegister";

const Register = () => {


  const { loading, error, dispatch } = useContext(AuthContext);


  const [openModal, setOpenModal] = useState(false);
  const [info, setInfo] = useState({});
  console.log("Dato del usuario  a enviar", info)

  const navigate = useNavigate();


  const handleChange = (e) => {

    const { id, type, checked, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value, // Maneja el checkbox
    }));



    //setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {

    e.preventDefault();

    try {

      // Registrar Usuario

      await axios.post("https://proyecto-integrador-enyoi-1-servidor.onrender.com/api/auth/register", info);

      setOpenModal(true);

      console.log("Usuario registrado exitosamente:", info);


      // Iniciar sesión automáticamente
      dispatch({ type: "LOGIN_START" });
      const res = await axios.post("https://proyecto-integrador-enyoi-1-servidor.onrender.com/api/auth/login", {
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

          <span></span>
          <div className="admin">
            <span>Admin Dashboard</span>
          </div>
        </nav>
      </div>
      <div className="newUserContainer">
        <h1>Create Your Account</h1>
        <form >
          {userInputs.map((input) => (
            <div className="formInput" key={input.id}>
              <label>{input.label}</label>
              {input.type === "checkbox" ? ( // Maneja el checkbox
                <input
                  onChange={handleChange}
                  type={input.type}
                  id={input.id}
                />
              ) : (
                <input
                  onChange={handleChange}
                  type={input.type}
                  placeholder={input.placeholder}
                  id={input.id}
                />
              )}

            </div>
          ))}
          <Link to={"/"}>
            <button className="Btn_Register" onClick={handleClick}>Registrar</button>
          </Link>

        </form>

      </div>


      {openModal && <MessagesRegister />}



    </div>

  )
}


export default Register;