import { useParams } from 'react-router-dom';
import './styles/FlightPage.css'
import { FlightContext, seats } from '../context/FlightContext';
import { useContext, useState } from 'react';
import FlightPreview from '../components/FlightPreview';

import EventSeatIcon from '@mui/icons-material/EventSeat';
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';
import Inputs from '../components/Inputs';
import GoBackButton from '../components/GoBackButton';



//TODO: add globe -> display flight from A to B
//TODO: RESPONSIVE

type passInfo = {
    name:string,
    surname:string,
}

function FlightPage() {
    let { id } = useParams();
    const context = useContext(FlightContext)

    const [seatReserve, setSeatReserve] = useState<number[]>([]);
    const [seatError, setSeatError] = useState(false);
  
    const [loading, setLoading] = useState(false)

    const [confirmReservation, setConfirmReservation] = useState(false);

    //Trigger for child components
    const [trigger, setTrigger] = useState(0);

    //Number of passsangers
    const [numOfPass, setNumOfPass] = useState(1);
    
    const [passInfo, setPassInfo] = useState<passInfo[]>([{
        name:'',
        surname:''
    },{
        name:'',
        surname:''
    },{
        name:'',
        surname:''
    },{
        name:'',
        surname:''
    }]);


    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    
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
        if(seatReserve.includes(seatId)) {
            let filteredArray = seatReserve.filter(item => item !== seatId)
            setSeatReserve(filteredArray);
        } else {
            if(!(seatReserve.length === numOfPass)) {
                setSeatReserve([...seatReserve, seatId]);
            }
            setSeatError(false)
        }
    }
    
    //Reserve seat
    const reserveSeat = () => {
        setTrigger(trigger+1);
       
        let a = 0;

        for(let i = 0; i < numOfPass; i++) {
            if(nameRegex(passInfo[i].name) &&
            nameRegex(passInfo[i].surname) &&
            emailRegex(email)) {
                a++;
            }
        }

        if(!emailRegex(email)) {
            setEmailErr(true);
        }

        if(a === numOfPass) {
            reserveSeatHelper();
        } 
    }

    const reserveSeatHelper = () => {
        if(seatReserve.length === numOfPass) {
            seats.forEach(element => {
                if(seatReserve.includes(element.id)) {
                    element.available = false
                }
            });
            context?.updateFlightsSeats(id, seats);
            
            let seat = {id:id, seatId:seatReserve}

            context?.setReservation([...context.reservation, seat]);

            setSeatReserve([]);
            setNumOfPass(1);

            setLoading(true);
            setTimeout(()=> {
                setLoading(false);
                setConfirmReservation(true);
            },1000)

        } else {
            setSeatError(true);
        }
    }

    //Decrement number of passangers
    const handleDec = () => {
        //numOfPass <= 1? setNumOfPass(1) : setNumOfPass(numOfPass-1);
        
        if(numOfPass <= 1) {
            setNumOfPass(1)
            //setSeatReserve([])
        } else {
            setNumOfPass(numOfPass-1)
            //setSeatReserve([])
        }

    }

    //Increment number of passangers
    const handleInc = () => {
        numOfPass >= freeSeats()? setNumOfPass(freeSeats()) : setNumOfPass(numOfPass+1)
    }

    const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
        setEmailErr(false);
    }

    return(
        <>
        {!loading?
        <>
        {!confirmReservation?
        <div className='flight-page-wrapper'>
            <GoBackButton className="go-back-btn"/>
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
                            ${seatReserve.includes(seat.id)? "seat-reserve":""}`}/>
                        </div>                    
                    )
                }
                </div>
                <p className='seat-err'>{seatError && "Choose seat"}</p>

                <div className='inpt'>
                    <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        placeholder="Email"
                        value={email}
                        onChange={handleEmail}
                        className={emailErr? 'error':''}
                    />
                    <p className='err-msg'>{emailErr && "Invalid email"}</p>
                </div>

                {(()=> {
                    for(let i = 0; i < numOfPass; i++) {
                        const options = [];
                        for (let i = 0; i < numOfPass; i++) {
                            options.push(     
                            <Inputs 
                                trigger={trigger}
                                passInfo={passInfo} 
                                passInfoFunc={setPassInfo}
                                index={i}
                            />
                            );
                        }
                        return options;
                    }
                })()}
            

                <button onClick={reserveSeat}>Reserve flight</button>
            </div>
        </div>
        
        :
            <div className='reservation'>
                <GoBackButton className="go-back-btn"/>
                <p>Reservation confirmed</p>
                <div className='info'>
                    <p>From: {result![0].from}</p>
                    <p>To: {result![0].to}</p>
                    <p>Departure: {new Date(Date.parse(result![0].departure)).toLocaleDateString().replaceAll('/', '.')} -  {new Date(Date.parse(result![0].departure)).toLocaleTimeString().substring(0,5)}</p>
                    <p>Passangers:</p>
                    {(()=> {
                        for(let i = 0; i < numOfPass; i++) {
                            const passangers = [];
                            for (let i = 0; i < numOfPass; i++) {
                                passangers.push(     
                                    <p className='person'>
                                        <PersonIcon />
                                        <span>{passInfo[i].name} {passInfo[i].surname}</span>
                                    </p>
                                );
                            }
                            return passangers;
                        }
                    })()}
                </div>
                <p>Tickets were sent to your email: {email}</p>
            </div>
        }
        </>
        :
            <div className='loading'>
                <CircularProgress />
            </div>
        }
        </>
    );
}

export default FlightPage;
export type { passInfo };


function nameRegex(str:string) {
    return Boolean((str.match(/^[A-Za-z]*$/)) && str !== '');
}

function emailRegex(str:string) {
    return Boolean(str.match(
        /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/
    ));
}

export {nameRegex, emailRegex}