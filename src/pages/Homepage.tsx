import SearchBar from '../components/SearchBar';
import ShowFlight from '../components/ShowFlight';
import './styles/Homepage.css'

function Homepage() {

    return(
        <div className='homepage'>
            <SearchBar />
            <ShowFlight />
        </div>
    );
}

export default Homepage;