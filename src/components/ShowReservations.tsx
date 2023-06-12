import { useContext } from 'react';
import { FlightContext } from '../context/FlightContext';
import './styles/ShowReservations.css'

function ShowReservations() {

    const context = useContext(FlightContext)

    return(
        <div className='show-registration'>
            {
                context?.reservation.map((element)=> (
                    <div className='registration'>
                        <p>FlightID: {element.id}</p>
                        <p>|</p>
                        <p>SeatID: {element.seatId}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default ShowReservations;