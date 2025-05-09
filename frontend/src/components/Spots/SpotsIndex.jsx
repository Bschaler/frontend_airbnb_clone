import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots} from "../../store/spots";
import SpotCard from './SpotCard';


function SpotsIndex(){
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    
    const spots = useSelector(state => {
        
        
        console.log('Current spots state:', state.spots); 
        return state.spots.allSpots;
    });
   
    
    
    useEffect(() => {
        console.log('Fetching rentals...');
        dispatch(fetchSpots())
        .catch(err => setError("Couldn't load spots. Please try again."));
    }, [dispatch]);

    if (error) {
        return (
        <div className = "spots-error">
            <p>{error}</p>
        </div>
            );
    }


    return (
        <div className="spots-container">
            {spots && spots.length > 0 ? (
                spots.map(spot => {
                    return <SpotCard key={spot.id} spot = {spot}/>
                })
            ) : (<p>No rentals are available at the moment</p>)}
        </div>
    );
}
export default SpotsIndex;