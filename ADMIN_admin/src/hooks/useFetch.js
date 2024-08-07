import { useEffect, useState } from 'react'

// Importar la depdencia axios, para las peticiones
import axios from 'axios'

// hook personalizados de React 

const useFetch = (url) => {

    console.log(url);

    const [data, setData] = useState([])   // la variable data almacena la informacion

    const [loading, setLoading] = useState(false)  //  Variable loading se usa para mostra un estado de carga,  ejemplo  true  la solicitud se esta procesando  false la solicitud termino

    const [error, setError] = useState(false)  // la variable error  almacena el error

    // Metodo para hacer  solicitu de HTTP  cuando se recargar la pagina.
    // sintaxis  useEffect( argumento 1, argumento 2  )
    useEffect(() => {


        const fetchData = async () => {

            // Inicia la solicitud 
            setLoading(true)
            try {

                // Se Realiza la peticion al Back end
                const res = await axios.get(url)
                /*
                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        //'Accept': 'application/json',
                    }
                })

                const data = await res.json()
                */
                console.log(res)

                // Se envia la informacion a al variable data 
                setData(res.data);

            } catch (err) {
                setError(err)
            }
            // Finaliza la solicitud
            setLoading(false)
        };

        // Llamar la funcion 
        fetchData();


    }, [url])  // se coloca la url como segundo argumento,  ya que la url va cambiar dinamicamente esto se hace con el objetivo de que si el usuario ingresa,selecciona o  click en un boton los datos cambien dinamicamente


    // Metodo para hacer  solicitud de HTTP  cuando no es necesario  recargar la pagina  y el usuario realiza un cambio como seleccionar un boton y cambie algo .
    const reFetch = async () => {

        setLoading(true)

        try {

            const res = await axios.get(url)
            console.log("Solicitud segunda", res);
            setData(res.data);

        } catch (err) {

            setError(err)
        }

        setLoading(false)
    };

    return { data, loading, error, reFetch }


};
export default useFetch;

