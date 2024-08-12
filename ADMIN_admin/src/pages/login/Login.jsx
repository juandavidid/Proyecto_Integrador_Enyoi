import "./login.scss"
import "./login.css"
import axios from "axios";
import { useState } from "react"
import { useContext } from "react";
//import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

import Register from "../register/Register";
import { Link } from 'react-router-dom';

const Login = () => {

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();


  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }


  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {

      const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
      console.log(res);

      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/")
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: { message: "You are not allowed!" } })
      }

    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
    }
  }

  //console.log(user);

  return (
    <div >


      <nav className="navlogin">
        <span className="logo" style={{ fontSize: '25px' }}>Booking.com</span>

        <span></span>
        <div className="admin">
          <span>Admin Dashboard</span>
        </div>
      </nav>



      <div className="login">


        <div className="lContainer">

          <h1 className="textLogin">Login In</h1>



          {/*Campo de texto  usuario */}
          <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" ></input>
          {/*Campo de texto  contraseña */}
          <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" ></input>
          {/*Boton */}
          <button disabled={loading} onClick={handleClick} className="lButton">Login</button>

          <Link to="/register" style={{ textDecoration: 'none' }}>
            <span className="textregister">Registrater</span>
          </Link>

          {error && <span>{error.message}</span>}
        </div>

      </div>

    </div>
  )
}

export default Login