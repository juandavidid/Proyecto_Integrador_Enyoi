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
// Importamos Calendario de fecha
import { DateRange } from 'react-date-range'


// Importamos Un componente
import Searchitem from '../components/searchItem/Searchitem'


const List = () => {


    const location = useLocation();
    console.log(location)
    const [destination, setDestination] = useState(location.state.destination)
    const [date, setDate] = useState(location.state.date)
    const [openDate, setOpenDate] = useState(false)
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
                            <span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}  `}</span>

                            {openDate && (<DateRange onChange={(item) => setDate([item.selection])} minDate={new Date()} ranges={date} />)}

                        </div>

                        <div className="lsItem">
                            <label>Options</label>
                            <div className="lsOptions">

                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Min price <small>per night</small></span>
                                    <input type="number" className="lsOptionInput"></input>
                                </div>

                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Max price <small>per night</small></span>
                                    <input type="number" className="lsOptionInput"></input>
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

                        <button>Search</button>


                    </div>
                    {/* MUESTRA LOS HOTELES CUARTOS */}
                    <div className="listResult">

                        <Searchitem />
                        <Searchitem />
                        <Searchitem />
                        <Searchitem />
                        <Searchitem />
                        <Searchitem />
                    </div>

                </div>

            </div>
        </div>
    )
}


export default List