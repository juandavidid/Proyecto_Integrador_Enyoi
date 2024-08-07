import { createContext, useEffect, useReducer } from 'react';


// Valores Iniciales
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    lodaing: false,
    error: null,
};


// Se crea un contexto React
export const AuthContext = createContext(INITIAL_STATE);


const AuthReducer = (state, action) => {

    switch (action.type) {
        case "LOGIN_START":  // Inicia proceso de login
            return {
                user: null,
                lodaing: true,
                error: null,
            };
        case "LOGIN_SUCCESS":  // Login exitoso
            return {
                user: action.payload,
                lodaing: false,
                error: null,
            };
        case "LOGIN_FAILURE": // login fallido
            return {
                user: null,
                lodaing: false,
                error: action.payload,
            };
        case "LOGOUT": // Cierra la sesion
            return {
                user: null,
                lodaing: false,
                error: null,
            };
        default:
            return state;
    }

};

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }} >
            {children}
        </AuthContext.Provider>
    )
};