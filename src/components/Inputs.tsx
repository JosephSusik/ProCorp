import { useEffect, useState } from 'react';
import './styles/Inputs.css'
import { passInfo } from '../pages/FlightPage';
import { nameRegex } from '../pages/FlightPage';

interface InputsProps {
   trigger: number
   passInfoFunc: Function;
   passInfo: passInfo[];
   index:number;
}

function Inputs(props:InputsProps) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const [nameErr, setNameErr] = useState(false)
    const [surnameErr, setSurnameErr] = useState(false)

    useEffect(()=> {
        if(props.trigger){
            //Validate inputs
            nameRegex(name)? setNameErr(false) : setNameErr(true);
            nameRegex(surname)? setSurnameErr(false) : setSurnameErr(true);
        }    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.trigger])

    const handleName = (e: React.FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
        
        let newArr = [...props.passInfo];
                
        newArr[props.index].name = e.currentTarget.value

        props.passInfoFunc(newArr)
            

        setNameErr(false);
    }

    const handleSurname = (e: React.FormEvent<HTMLInputElement>) => {
        setSurname(e.currentTarget.value);
        let newArr = [...props.passInfo];

        newArr[props.index].surname = e.currentTarget.value

        props.passInfoFunc(newArr)

        setSurnameErr(false);
    }


    return(
        <div className='inputs'>
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
        
        </div>
    );
}

export default Inputs