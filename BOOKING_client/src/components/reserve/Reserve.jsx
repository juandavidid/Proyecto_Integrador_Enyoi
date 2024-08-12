import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import './reserve.css';
import useFetch from '../../hooks/useFetch';
import { useContext, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Reserve = ({ setOpen, hotelId, totalPrice }) => {
    const { user } = useContext(AuthContext);
    console.log("Informacion del usuario", user);  // Dato del usuario iniciar sesion

    const [selectedRooms, setSelectedRooms] = useState([]);
    console.log("Informacion selecionar ", selectedRooms); // id del numero del cuarto  de la habitacion


    //Solicitud al servidor
    const { data, loading, error } = useFetch(`/api/hotels/room/${hotelId}`);
    console.log("Informacion de la data", data);  // data esta la informacion  del Habitacion con su numeros de cuartos


    //React Context
    const { dates } = useContext(SearchContext);
    console.log("Informacion contexto", dates)   // dates esta la informacion de la fecha seleccionada por usuario

    console.log("Id del Hotel seleccionado", hotelId);   // 


    //console.log(data);
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime());
        const dates = []

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1)
        }
        return dates
    };

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    //Funcion que inabilitada si el otro cliente quiere reservar una habitacion que ya esta ocupada
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) => alldates.includes(new Date(date).getTime()))
        return !isFound

    }

    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));
    }


    //console.log(selectedRooms);

    const navigate = useNavigate()


    // Funcion que permite enviar los datos al servidor para desabilitar la opcion del numero del cuarto 
    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                    const res = axios.put(`/api/rooms/availability/${roomId}`, {
                        dates: alldates
                    });
                    return res.data
                })
            );

            // Crear la reserva en el backend
            const reservationData = {
                user: user._id, // ID del usuario autenticado
                hotel: hotelId, // ID del hotel seleccionado
                room: data[0]._id, // ID de la primera habitación seleccionada (puedes ajustar esto según tu lógica)

                roomNumber: data.find(item => item.roomNumbers.some(rn => rn._id === selectedRooms[0])).roomNumbers.find(rn => rn._id === selectedRooms[0]).number,
                startDate: dates[0].startDate.toISOString(),
                endDate: dates[0].endDate.toISOString(),
                totalPrice: totalPrice  //data.find(item => item.roomNumbers.some(rn => rn._id === selectedRooms[0])).price * alldates.length,
            };
            console.log("Id del Habitacion", reservationData.room);

            const res = await axios.post('/api/reservations', reservationData);

            console.log('Reserva realizada con éxito:', res.data);
            setOpen(false)
            navigate("/")
        } catch (err) { }
    };

    return (
        <div className="reserve">
            <div className='rContainer'>
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
                <span>Select your rooms:</span>
                {data.map((item) => (
                    <div className="rItem">
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">Max people <b>{item.maxPeople}</b></div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className="rSelectRooms">
                            {item.roomNumbers.map((roomNumber) => (
                                <div className="room">
                                    <label>{roomNumber.number}</label>
                                    <input
                                        type="checkbox"
                                        value={roomNumber._id}
                                        onChange={handleSelect}
                                        disabled={!isAvailable(roomNumber)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className="rButton">Reserve Now!</button>
            </div>
        </div>
    )
}
export default Reserve;
