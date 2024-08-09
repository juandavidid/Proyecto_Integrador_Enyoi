import "./login.scss"
import axios from "axios";
import { useState } from "react"
import { useContext } from "react";
//import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

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

      const res = await axios.post("/api/auth/login", credentials);
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
    <div className="login">
      <div className="lContainer">

        {/*Campo de texto  usuario */}
        <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" ></input>
        {/*Campo de texto  contraseña */}
        <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" ></input>
        {/*Boton */}
        <button disabled={loading} onClick={handleClick} className="lButton">Login</button>

        {error && <span>{error.message}</span>}
      </div>
    </div>
  )
}

export default Login