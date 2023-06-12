import { useContext } from 'react';
import './styles/ShowFlight.css'
import {FlightContext} from '../context/FlightContext';
import FlightPreview from './FlightPreview';

function ShowFlight() {

    const context = useContext(FlightContext)

    let result = context?.flights.filter((obj) => {
        return ((obj.from === context.filter.from) &&
        (obj.to === context.filter.to) &&
        (new Date(Date.parse(obj.departure)).toISOString().substring(0,10) > context.filter.date));
    });

    return(
        <div className='show-flights'>
            {result?.length !== 0?
                <div className='flights-found'>
                    {
                        result?.map((element) => <FlightPreview flight={element} />)
                    }
                </div>
            :    
                <div>
                    <p className='no-flights'>No flight found</p>
                </div>
            }

        </div>
    );
}

export default ShowFlight;