import "./register.css"
import { useState } from "react";
import { userInputs } from "../../formSource";

import axios from "axios";

const Register = () => {
  const [info, setInfo] = useState({});
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", info);
      console.log("Usuario registrado exitosamente:", info);
    } catch (err) {
      console.error("Error al registrar el usuario:", err);
    }
  };


  return (
    <div className="newUserContainer">
      <h1>REGISTRO</h1>
      <form>
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
        <button className="Btn_Register" onClick={handleClick}>Registrar</button>
      </form>
    </div>

  )
}


export default Register;