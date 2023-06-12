import { useParams } from 'react-router-dom';
import './styles/FlightPage.css'
import { FlightContext, seats } from '../context/FlightContext';
import { useContext, useState } from 'react';
import FlightPreview from '../components/FlightPreview';

import EventSeatIcon from '@mui/icons-material/EventSeat';

function FlightPage() {
    let { id } = useParams();
    const context = useContext(FlightContext)

    const [seatReserve, setSeatReserve] = useState(0);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false)

    let result = context?.flights.filter((obj) => {
        return obj.id === Number(id);
    });

    let seats:seats[] = []

    result?.map((element) => (
        seats = element.seats
    ))


    const chooseSeat = (seatId:number) => {
        seatId === seatReserve? 
            setSeatReserve(0) 
            : 
            setSeatReserve(seatId);
    }


    const reserveSeat = () => {
        if (!(name && surname && email)) {
            setError(true)
        } else {
            if(seatReserve !== 0) {
                seats.forEach(element => {
                    if(element.id === seatReserve) {
                        element.available = false
                    }
                });
                context?.updateFlightsSeats(id, seats);
                
                let seat = {id:id, seatId:seatReserve}
    
                context?.setReservation([...context.reservation, seat]);
    
    
                setSeatReserve(0);
            }   
        }
    }

    const handleName = (e: React.FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
        setError(false);
    }
    const handleSurname = (e: React.FormEvent<HTMLInputElement>) => {
        setSurname(e.currentTarget.value);
        setError(false);
    }
    const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
        setError(false);
    }

    return(
        <div className='flight-page-wrapper'>
            <div className='flight-page'>
                {                        
                result?.map((element) => <FlightPreview flight={element} />)
                }
                <p className='choose-seat'>Choose your seat:</p>
                <div className='seats'>
                {
                    seats?.map((seat:any)=> 
                    
                        <div className='seat' key={seat.id}
                            onClick={()=>(seat.available && chooseSeat(seat.id))}
                        >
                            <p>{seat.number}</p>
                            <EventSeatIcon className={`icon ${seat.available? "available":"not-available"} 
                            ${seat.id === seatReserve? "seat-reserve":""}`}/>
                        </div>                    
                    )
                }
            </div>

            <div className='inputs'>
                <p>Your info:</p>
                <input 
                    type="text"
                    name="name" 
                    id="name" 
                    placeholder='Name'
                    value={name}
                    onChange={handleName}
                    className={error? 'error':''}
                />
                
                <input
                    type="text"
                    name="surname"
                    id="surname" 
                    placeholder='Surname'
                    value={surname}
                    onChange={handleSurname}
                    className={error? 'error':''}
                />
                
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder='Email'
                    value={email}
                    onChange={handleEmail}
                    className={error? 'error':''}
                />
            </div>


            <button onClick={reserveSeat}>Reserve flight</button>
            </div>
        </div>
    );
}

export default FlightPage;