import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import './reserve.css';
import useFetch from '../../hooks/useFetch';
import { useContext, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';

const Reserve = ({ setOpen, hotelId }) => {

    const [selectedRooms, setSelectedRooms] = useState([]);

    //Solicitud al servidor
    const { data, loading, error } = useFetch(`/api/hotels/room/${hotelId}`);


    //React Context
    const { dates } = useContext(SearchContext);
    //console.log(data);



    const getDatesInRange = (startDate, endDate) => {

        const start = new Date(startDate)
        const end = new Date(endDate)

        const date = new Date(start.getTime());

        let list = []

        while (data <= end) {
            list.push(new Date(date))
            date.setDate(date.getDate() + 1)
        }

        return list
    };

    console.log(getDatesInRange(dates[0].startDate, dates[0].endDate))

    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));
    }

    //console.log(selectedRooms);
    const handleClick = () => {

    }

    return (
        <div className="reserve">
            <div className='rContainer'>
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" oncClick={() => setOpen(false)} />
                <span>Select your rooms:</span>
                {data.map((item) => (
                    <div className="rItem">
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desd}</div>
                            <div className="rMax">Max people <b>{item.maxPeople}</b></div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        {item.roomNumbers.map((roomNumber) => (
                            <div className="room">
                                <label>{roomNumber.number}</label>
                                <input type="checkbox" value={roomNumber._id} onChange={handleSelect} />
                            </div>
                        ))}
                    </div>
                ))}
                <button onClick={handleClick} className="rButton">Reserve Now!</button>
            </div>
        </div>
    )
}
export default Reserve;
