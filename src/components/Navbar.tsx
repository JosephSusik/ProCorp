import { Link, useNavigate } from 'react-router-dom';
import './styles/Navbar.css'
import { useState } from 'react';
import ShowReservations from './ShowReservations';
import ClickAwayListener from 'react-click-away-listener';

function Navbar() {
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}
    return(
        <nav>
            <Link to={'/'}>Home</Link>
            <button onClick={goBack} >&lt;</button>
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