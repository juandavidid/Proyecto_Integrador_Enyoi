// Importamos Estilos CSS
import './header.css'
// Importamos Iconos
// Renderiza Iconos en React 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Importa un icono en especifico
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import { faTaxi } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faPerson } from '@fortawesome/free-solid-svg-icons'

// Importamos Calendario de fecha
import { DateRange } from 'react-date-range'
// Importamos los estilos de calendario para ver su Interfaz Grafica
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

// Importamos el metodo format para formatear fechas
import { format } from "date-fns"


// Importamos
import { useState } from "react";

// Declaramos una funcion componente
const Header = ({ type }) => {


    // INICIALIZAR HOOK

    // declaracion de un estado HOOK Mostrar calendario
    const [openDate, setOpenDate] = useState(false)
    // declaracion de un estado HOOK Capturar  la seleccion de fechas
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    // Declaracion de un estado HOOK

    // Se usa para abrir o cerrar un menú de opciones.
    const [openOptions, setOpenOptions] = useState(false)
    //
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })

    //Funcion 

    /*
      los Parametros pueden resibir
      name: adult  children o room
      operation:  i (incrementar)  d (decrementar)
    */
    const handleOption = (name, operation) => {
        setOptions((prev) => {
            console.log(prev)  // prev = { adul: 1 ,  children : 0  , room : 1}
            return {
                ...prev, // crea una copia del objeto anterior en este caso prev 
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
                // al final devuelve objeto
            }
        })

    }

    // options = { adult:1, children:0 , room: 1  }
    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        {/*Uso del Icono de cama */}
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        {/*Uso del Icono de Avion */}
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        {/*Uso del Icono de car */}
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        {/*Uso del Icono de cama */}
                        <FontAwesomeIcon icon={faBed} />
                        <span>Atractions</span>
                    </div>
                    <div className="headerListItem">
                        {/*Uso del Icono de taxi */}
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>

                {/* Se coloca la condicion de no mostrar cierta parte de los elementos en cierto Componentes que esta definio <Header/>  */}
                {type !== "list" &&
                    <>
                        <h1 className="headerTitle">A lifetime of discounts? It's Genius</h1>
                        <p className="headerDesc">
                            Get rewarded for your travels - unlock instant saving of 10% or
                            more with a free lamabooking account
                        </p>
                        <button className="headerBtn">Sing in / Register</button>

                        {/*ESTRUCTURA DEL BUSCADOR */}
                        <div className="headerSearch">

                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                                {/*Campo de texto */}
                                <input
                                    type="text"
                                    placeholder='Where are you going ?'
                                    className="headerSearchInput"
                                />
                            </div>

                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />

                                <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}  `}</span>

                                {/*COMPONENTE CALENDARIO Y SELECCIONAR FECHA */}


                                {/* Condicional para renderizar  es decir para mostra el calendario  y no mostrarlo */}
                                {openDate && <DateRange
                                    editableDateInputs={true} // permite seleccionar las fechas en los campos de entrada que tiene el  calendario 
                                    onChange={item => setDate([item.selection])}
                                    /*
                                    onChange={item => {
                                        setDate([item.selection]);
                                        console.log(item);
                                        console.log(item.selection);
                                        console.log('Start Date:', item.selection.startDate);
                                        console.log('End Date:', item.selection.endDate);
                                    }}
                                    */
                                    moveRangeOnFirstSelection={false}
                                    ranges={date}  // Inicialmente ubica la fecha inicial y final  antes de seleccionar fechas en el calendario
                                    className="date"
                                />

                                }

                            </div>
                            {/*Seleccionar Adultos niños y personas */}
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                                <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult - ${options.children} children - ${options.room} room `}</span>
                                {/* Condicional para renderizar:   es decir para mostra el selector adultos niños y cuartos cuando se click muestres */}
                                {openOptions && <div className="options">
                                    <div className="optionItem">
                                        <span className="optionText" >Adult</span>
                                        <div className="optionCounter">
                                            <button disabled={options.adult <= 1} className="optionCounterButton" onClick={() => handleOption("adult", "d")} >-</button>
                                            <span className="optionCounterNumber">{options.adult}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>

                                        </div>

                                    </div>

                                    <div className="optionItem">
                                        <span className="optionText" >Children</span>
                                        <div className="optionCounter">
                                            <button disabled={options.children <= 0} className="optionCounterButton" onClick={() => handleOption("children", "d")}>-</button>
                                            <span className="optionCounterNumber">{options.children}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                                        </div>

                                    </div>

                                    <div className="optionItem">
                                        <span className="optionText" >Room</span>
                                        <div className="optionCounter">
                                            <button disabled={options.room <= 1} className="optionCounterButton" onClick={() => handleOption("room", "d")}>-</button>
                                            <span className="optionCounterNumber">{options.room}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>

                                        </div>

                                    </div>
                                </div>

                                }

                            </div>
                            {/*Boton Busqueda */}
                            <div className="headerSearchItem">
                                <button className="headerBtn">Search</button>
                            </div>



                        </div>
                    </>
                }

            </div>

        </div>

    )
}
export default Header;