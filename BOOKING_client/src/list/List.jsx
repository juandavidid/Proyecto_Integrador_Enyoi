import React from 'react'
import './list.css'
import Header from '../components/header/Header'
import Navbar from '../components/navbar/Navbar'

// Importamos el metodo format para formatear fechas
import { format } from "date-fns"

// Importamos
import { useLocation } from "react-router-dom";
// Importamos  useState
import { useState } from "react";


const List = () => {


    const location = useLocation();
    console.log(location)
    const [destination, setDestination] = useState(location.state.destination)
    const [date, setDate] = useState(location.state.date)
    const [options, setOptions] = useState(location.state.options)


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
                            <span >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}  `}</span>

                        </div>


                    </div>
                    <div className="listResult"></div>

                </div>

            </div>
        </div>
    )
}


export default List