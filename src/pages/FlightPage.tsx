import { useParams } from 'react-router-dom';
import './styles/FlightPage.css'
import { FlightContext, seats } from '../context/FlightContext';
import { useContext, useState } from 'react';
import FlightPreview from '../components/FlightPreview';

import EventSeatIcon from '@mui/icons-material/EventSeat';


function nameRegex(str:string) {
    return Boolean(str.match(/^[A-Za-z]*$/));
}

function emailRegex(str:string) {
    return Boolean(str.match(
        /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/
    ));
}

function FlightPage() {
    let { id } = useParams();
    const context = useContext(FlightContext)

    const [seatReserve, setSeatReserve] = useState(0);
    const [seatError, setSeatError] = useState(false);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");

    const [nameErr, setNameErr] = useState(false)
    const [surnameErr, setSurnameErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)

    //Number of passsangers
    const [numOfPass, setNumOfPass] = useState(1);


    //Get flight from url id
    let result = context?.flights.filter((obj) => {
        return obj.id === Number(id);
    });

    let seats:seats[] = []

    //Extract seats from choosen flight
    result?.map((element) => (
        seats = element.seats
    ))

    //Get number of free seats
    const freeSeats = () => {
        let seat = 0
        seats.forEach(element => {
            (element.available === true) && (seat += 1);
        })
        return seat;
    }

    //Choose seat
    const chooseSeat = (seatId:number) => {
        seatId === seatReserve? 
            setSeatReserve(0) 
            : 
            setSeatReserve(seatId);
            setSeatError(false)
    }

    //Reserve seat
    const reserveSeat = () => {

        if(!(nameRegex(name) && nameRegex(surname) && emailRegex(email))) {
            nameRegex(name)? setNameErr(false) : setNameErr(true);
            nameRegex(surname)? setSurnameErr(false) : setSurnameErr(true);
            emailRegex(email)? setEmailErr(false) : setEmailErr(true);    
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
                setNumOfPass(1);
            } else {
                setSeatError(true);
            }  
        }
    }

    const handleName = (e: React.FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
        setNameErr(false);
    }

    const handleSurname = (e: React.FormEvent<HTMLInputElement>) => {
        setSurname(e.currentTarget.value);
        setSurnameErr(false);
    }
    const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
        setEmailErr(false);
    }

    //Decrement number of passangers
    const handleDec = () => {
        numOfPass <= 1? setNumOfPass(1) : setNumOfPass(numOfPass-1)
    }

    //Increment number of passangers
    const handleInc = () => {
        numOfPass >= freeSeats()? setNumOfPass(freeSeats()) : setNumOfPass(numOfPass+1)
    }


    return(
        <div className='flight-page-wrapper'>
            <div className='flight-page'>
                {                        
                result?.map((element) => <FlightPreview flight={element} />)
                }
                
                <div className='number-people'>
                    <p>number of passsangers:</p>
                    <div className='counter'>
                        <button onClick={handleDec} 
                            className={numOfPass === 1? 'disable':''}
                        >
                            -
                        </button>
                        
                        <p>{numOfPass}</p>

                        <button onClick={handleInc} 
                            className={numOfPass === freeSeats()? 'disable':''}
                        >
                            +
                        </button>
                    </div>
                </div>

                <p className='choose-seat'>
                    {numOfPass === 1?
                        'Choose your seat:'
                    :
                        'Choose your seats:'
                    }
                </p>
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
                <p className='seat-err'>{seatError && "Choose seat"}</p>

                <div className='inputs'>
                    <p>Your info:</p>
                    <div className='inpt'>
                        <input 
                            type="text"
                            name="name" 
                            id="name" 
                            placeholder='Name'
                            value={name}
                            onChange={handleName}
                            className={nameErr? 'error':''}
                        />
                        <p className='err-msg'>{nameErr && "Invalid name"}</p>
                    </div>
                    
                    <div className='inpt'>
                        <input
                            type="text"
                            name="surname"
                            id="surname" 
                            placeholder='Surname'
                            value={surname}
                            onChange={handleSurname}
                            className={surnameErr? 'error':''}
                        />
                        <p className='err-msg'>{surnameErr && "Invalid surname"}</p>
                    </div>
                    
                    <div className='inpt'>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder='Email'
                            value={email}
                            onChange={handleEmail}
                            className={emailErr? 'error':''}
                        />
                        <p className='err-msg'>{emailErr && "Invalid email"}</p>
                    </div>
                
                </div>

                <button onClick={reserveSeat}>Reserve flight</button>
            </div>
        </div>
    );
}

export default FlightPage;