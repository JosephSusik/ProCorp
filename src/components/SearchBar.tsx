import { useContext, useState } from 'react';
import { FlightContext } from '../context/FlightContext';
import DropDown from './DropDown';
import './styles/SearchBar.css'

function SearchBar() {
    const context = useContext(FlightContext)
    
    const [fromValue, setFromValue] = useState("")
    const [toValue, setToValue] = useState("")
    const [dateValue, setDateValue] = useState(context?.filter.date)

    const from:string[] = []
    const to:string[] = []

    context?.flights.forEach((data) => {
        //Remove duplicates
        !from.includes(data.from) && from.push(data.from)
        !to.includes(data.to) && to.push(data.to)
    })

    const updateFilters = () => {
        context?.setFilter({...context.filter, 
            from:fromValue, 
            to:toValue,
            date:dateValue
        })
    }

    const handleDate = (e:React.FormEvent<HTMLInputElement>) => {
        setDateValue(e.currentTarget.value);
    }

    return(
        <div className='search-bar'>
            <DropDown 
                options={from.sort()} 
                selectedValueSetter={setFromValue}
                filterValue={context?.filter.from!}
                placeholder='From'
            />

            <DropDown 
                options={to.sort()} 
                selectedValueSetter={setToValue}
                filterValue={context?.filter.to!}
                placeholder='To'
            />

            <input 
                type="date" 
                name="calendar" 
                id="calendar"
                value={dateValue}
                onChange={handleDate}
            />

            <button onClick={updateFilters}>Search</button>
        </div>
    );
}

export default SearchBar;