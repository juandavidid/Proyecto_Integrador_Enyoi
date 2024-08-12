import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';





const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {

        e.preventDefault();

        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post("/api/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };


    return (


        <div className="login">

            <nav className="navlogin">
                <span className="logo" style={{ fontSize: '25px' }}>Booking.com</span>
                <div>
                    <FontAwesomeIcon className="iconSingIn" icon={faSignInAlt} />
                    <FontAwesomeIcon className="textQuestion" icon={faCircleQuestion} />

                </div>

            </nav>

            <h1 className="textLogin">Login In</h1>

            <div className="lContainer">
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    onChange={handleChange}
                    className="lInput"
                />
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    onChange={handleChange}
                    className="lInput"
                />
                <button disabled={loading} onClick={handleClick} className="lButton">
                    Login
                </button>
                {error && <span>{error.message}</span>}
            </div>

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
    );
};

export default Login;