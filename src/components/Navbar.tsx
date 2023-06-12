import { Link } from 'react-router-dom';
import './styles/Navbar.css'
import { useState } from 'react';
import ShowReservations from './ShowReservations';
import ClickAwayListener from 'react-click-away-listener';

function Navbar() {
    const [show, setShow] = useState(false)

    return(
        <nav>
            <Link to={'/'}>Home</Link>
            <div className='relative'>
                <button onClick={()=>setShow(!show)} className='btn'>Show reservations</button>
                {show &&
                <ClickAwayListener onClickAway={()=>setShow(false)}>
                    <div className='abs'>
                        <ShowReservations />
                    </div>
                </ClickAwayListener>
                }
            </div>
        </nav>
    );
}

export default Navbar;