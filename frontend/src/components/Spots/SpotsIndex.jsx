import { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots} from "../../store/spots";
import SpotCard from './SpotCard';
import './Spots.css'

function SpotsIndex(){
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const spots = useSelector(state => {
        console.log('Current spots state:', state.spots);
     
        if (state.spots?.allSpots?.Spots) {
            return state.spots.allSpots.Spots;
        }
       
        return [];
    });
    
   
    
    
    useEffect(() => {
        console.log('Fetching those spots...');
        dispatch(fetchSpots())
        .then(() => {
            setIsLoading(false);
        })
        .catch(err => {
            console.error("Error fetching spots:", err);
            setError("Couldn't load spots. Please try again.");
            setIsLoading(false);
        });
}, [dispatch]);

if (isLoading) {
    return <div className="loading-message">Loading spots...</div>;
}

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