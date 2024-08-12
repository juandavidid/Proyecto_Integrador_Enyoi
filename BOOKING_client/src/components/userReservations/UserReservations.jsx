import './userReservations.css'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useEffect, useState, useContext } from 'react';

import Navbar from "../../components/navbar/Navbar.jsx"
import Header from "../../components/header/Header.jsx"
import Footer from "../../components/footer/Footer.jsx"
import MailList from "../../components/mailList/MailList.jsx"



const UserReservations = () => {

    const [showMessage, setShowMessage] = useState(false);
    //const [successMessage, setSuccessMessage] = useState('');

    const [message, setMessage] = useState("");




    const { user } = useContext(AuthContext);  // Asumiendo que tienes el usuario en tu contexto de autenticación
    const [reservations, setReservations] = useState([]);
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const res = await axios.get(`/api/reservations/${user._id}`);
                setReservations(res.data);
            } catch (err) {
                console.error("Error fetching reservations: ", err);
            }
        };

        fetchReservations();
    }, [user._id]);

    console.log("ID DE LA RESERVA", reservations[0]);


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

    const handleClick = async () => {
        try {
            const roomId = reservations[0].room._id; // ID de la habitación general
            console.log(roomId);
            const roomNumberToUpdate = reservations[0].roomNumber; // Número de la habitación específica

            // Busca el ID del número de cuarto específico
            const roomNumberObject = reservations[0].room.roomNumbers.find(
                (roomNumber) => roomNumber.number === roomNumberToUpdate
            );

            if (roomNumberObject) {
                const roomNumberId = roomNumberObject._id; // ID del número de cuarto específico

                // Actualizar la disponibilidad del cuarto
                await axios.put(`/api/rooms/availability/${roomNumberId}`, {
                    dates: [] // Aquí defines si es para eliminar o agregar fechas
                });

                // Eliminar la reserva
                const res = await axios.delete(`/api/reservations/${reservations[0]._id}`);
                console.log("Reserva eliminada:", res);



                // Actualizar la lista de reservas después de eliminar
                setReservations(prevReservations =>
                    prevReservations.filter(res => res._id !== reservations._id)
                );



                // Mostrar el mensaje de confirmación
                setMessage("Reserva cancelada con éxito.");
                setShowMessage(true);

                // Ocultar el mensaje después de 3 segundos
                setTimeout(() => {
                    setShowMessage(false);
                }, 8000);

                window.location.reload();  // Recarga la página



                console.log("RESERVA CANCELADA");

            } else {
                console.error("No se encontró el número de cuarto específico.");
            }
        } catch (err) {
            console.error("Error no se ha cancelado la reserva", err);
        }
    };

    return (
        <div>

            <Navbar />
            <Header type="list" />


            <nav className='navbarReservations'>
                <h1 className="textReservations">My Reservations</h1>
            </nav>

            {reservations.length > 0 ? (

                <div className="conteinerTable">
                    <table className="reservationsTable">
                        <thead>
                            <tr>
                                <th>Hotel</th>
                                <th>Room</th>
                                <th>Room Number</th>
                                <th>Check-in</th>
                                <th>Check-out</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map(reservation => (
                                <tr key={reservation._id}>
                                    <td>{reservation.hotel.name}</td>
                                    <td>{reservation.room.title}</td>
                                    <td>{reservation.roomNumber}</td>
                                    <td>{new Date(reservation.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(reservation.endDate).toLocaleDateString()}</td>
                                    <td>${reservation.totalPrice}</td>
                                    <td>
                                        <button onClick={() => handleClick(reservation._id)}>CANCELAR RESERVA</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>


            ) : (
                <div >

                    <table className="reservationsTable">
                        <thead>
                            <tr>
                                <th>Hotel</th>
                                <th>Room</th>
                                <th>Room Number</th>
                                <th>Check-in</th>
                                <th>Check-out</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map(reservation => (
                                <tr key={reservation._id}>
                                    <td>{reservation.hotel.name}</td>
                                    <td>{reservation.room.title}</td>
                                    <td>{reservation.roomNumber}</td>
                                    <td>{new Date(reservation.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(reservation.endDate).toLocaleDateString()}</td>
                                    <td>${reservation.totalPrice}</td>
                                    <td>
                                        <button onClick={() => handleClick(reservation._id)}>CANCELAR RESERVA</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='textnotReservations'>
                        <p>You have no reservations.</p>

                    </div>



                </div>

            )}



            {showMessage && <div className="message-box">{message}</div>} {/* Mensaje de confirmación */}

            <MailList />
            <div className="contenedorFooter">
                <Footer />
            </div>



        </div>
    )
}

export default UserReservations;