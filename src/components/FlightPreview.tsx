import { Link } from 'react-router-dom';
import { flight } from '../context/FlightContext';
import './styles/FlightPreview.css'

import FlightIcon from '@mui/icons-material/Flight';

interface FlightPreviewInterface {
    flight: flight
}

function FlightPreview({flight}:FlightPreviewInterface) {
    return(
        <Link to={'/flight/'+flight.id}>
            <div className='flight-preview'>
                <div>
                    <p className='date'>{new Date(Date.parse(flight.departure)).toLocaleDateString().replaceAll('/', '.')}</p>
                </div>
                
                <div className='departure-arrival'>
                    <div className='column'>
                        <p className='airport'>{flight.from}</p>
                        <p className='time'>{new Date(Date.parse(flight.departure)).toLocaleTimeString().substring(0,5)}</p>
                    </div>
                    <div className='column'>
                        <FlightIcon className='icon'/>
                        <p className='duration'>{flight.duration}</p>
                    </div>
                    <div className='column'>
                        <p className='airport'>{flight.to}</p>
                        <p className='time'>{new Date(Date.parse(flight.arrival)).toLocaleTimeString().substring(0,5)}</p>
                    </div>
                </div>
                
                <p className='price'>${flight.price} </p>
            
            </div>
        </Link>
    );
}

export default FlightPreview;