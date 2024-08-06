import React from 'react'
import './list.css'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'

// Importamos el metodo format para formatear fechas
import { format } from "date-fns"

// Importamos
import { useLocation } from "react-router-dom";
// Importamos  useState
import { useState } from "react";
// Importamos Calendario de fecha
import { DateRange } from 'react-date-range'


// Importamos Un componente
import Searchitem from '../../components/searchItem/Searchitem';

// Importamos hook

import useFetch from '../../hooks/useFetch';

const List = () => {


    const location = useLocation();
    console.log(location)
    const [destination, setDestination] = useState(location.state.destination)
    const [dates, setDates] = useState(location.state.dates);
    const [openDate, setOpenDate] = useState(false);  // const [openDate, setOpenDate] = useState(false)
    const [options, setOptions] = useState(location.state.options)
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);


    console.log(destination)


    //Hook de solicitudes a la APP servidor
    const { data, loading, error, reFetch } = useFetch(`/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`); // &min=${min || 0}&max=${max || 999}
    console.log(data);

    // Funcion handleClick
    // Se usa esta funcion cuando el usuario ingresa informacion y los datos no cambia dinamicamente si no toca mediante la accion de seleccionar un boton
    const handleClick = () => {
        reFetch(); // Metodo : para solicitar datos al servidor 

    }
    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label>Destination</label>
                            <input placeholder={destination} type="text" />
                        </div>
                        <div className="lsItem">
                            <label>Check-in Date</label>

                            {/*fomateo de la fecha para mostrar */}
                            <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}  `}</span>

                            {openDate && (<DateRange onChange={(item) => setDates([item.selection])} minDate={new Date()} ranges={dates} />)}

                        </div>

                        <div className="lsItem">
                            <label>Options</label>
                            <div className="lsOptions">

                                {/* PRECIO MINIMO */}

                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Min price <small>per night</small></span>

                                    {/*Campo numerico donde ingresa el valor precio minimo */}
                                    <input type="number" onChange={e => setMin(e.target.value)} className="lsOptionInput"></input> {/* onChange={e => setMin(e.target.value)} Capturamos el valor que se ingresa en la caja de texto */}
                                </div>

                                {/* PRECIO MAXIMO */}
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Max price <small>per night</small></span>

                                    {/*Campo numerico donde ingresa el valor precio maximo */}
                                    <input type="number" onChange={e => setMax(e.target.value)} className="lsOptionInput"></input>  {/* onChange={e => setMin(e.target.value)} Capturamos el valor que se ingresa en la caja de texto */}
                                </div>

                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Adult </span>
                                    <input type="number" min={1} className="lsOptionInput" placeholder={options.adult}></input>
                                </div>

                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Children </span>
                                    <input type="number" min={0} className="lsOptionInput" placeholder={options.children}></input>
                                </div>

                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Room </span>
                                    <input type="number" min={1} className="lsOptionInput" placeholder={options.room}></input>
                                </div>


                            </div>



                        </div>

                        {/*BOTON BUSCAR */}
                        <button onClick={handleClick}>Search</button>


                    </div>


                    {/* MUESTRA LOS HOTELES */}
                    <div className="listResult">

                        {loading ? ("loading") : (<>
                            {data.map(item => (
                                <Searchitem item={item} key={item._id} />
                            ))}
                        </>)}
                    </div>

                </div>

            </div>
        </div>
    )
}


export default List