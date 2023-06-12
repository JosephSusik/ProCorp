import React, { useState } from 'react'
import data from '../flights.json'

type seats = {
    "id":number,
    "number":string,
    "available":boolean
}

type flight = {
    "id":number,
    "from":string,
    "to":string,
    "departure":string,
    "arrival":string,
    "duration":string,
    "price":number,
    "seats":seats[]
}

type filter = {
    "from":string,
    "to":string,
    "date":string
}

type reservation = {
    id: number,
    seatId: number
}

type contextType = {
    flights:flight[],
    updateFlightsSeats:Function,
    filter:filter,
    setFilter:Function,
    reservation:reservation[],
    setReservation:Function
}



let flightsInit:flight[] = []

//Read JSON into flights
data.forEach(element => {
    flightsInit.push(element)
});

const FlightContext = React.createContext<contextType | null>(null)

function FlightProvider(props:any) {
    const [flights, setFlights] = useState<flight[]>(flightsInit);
    const [filter, setFilter] = useState<filter>({
        from:'',
        to:'',
        date: new Date().toISOString().substring(0,10)
    });

    const [reservation, setReservation] = useState<reservation[]>([])    

    
    const updateFlightsSeats = (flightID:number, value:seats[]) => {
        let newArr = [...flights]; //Create copy

        newArr[flightID].seats = value; //Replace seats

        setFlights(newArr);
    }

    

    return(
        <FlightContext.Provider value={{flights, updateFlightsSeats, filter, setFilter, reservation, setReservation}}>
            { props.children }
        </FlightContext.Provider>
    )
}

const FlightConsumer = FlightContext.Consumer;

export { FlightConsumer, FlightContext };

export type { flight, seats };

export default FlightProvider;