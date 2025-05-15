import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetail } from '../../store/spots'; 
import './Spots.css';


function SpotDetail() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const spot = useSelector(state => state.spots.singleSpot);
    const currentUser = useSelector(state => state.session.user);
    
    
    useEffect(() => {
        const getSpot = async () => {
            try {
            console.log(`Trying to fetch spot ${spotId}`);
                
                await dispatch(fetchSpotDetail(spotId));
                setLoading(false);
                console.log("Got the spot!");
            } catch (error) {
                console.log("Something went wrong..", error);
                
                setErr("Couldn't load spot. Please try again!");
                setLoading(false);
            }
        };
        getSpot();
    }, [spotId, dispatch]);

    if (loading) return <div>LOADING...</div>
    if (err) return <div>Oh no: {err}</div>
    if (!spot) return <div>No spot found...</div>;

    return( 
        
       
        <div className="spot-detail">
        <h1>{spot.name}</h1>
        
        <div className="spot-header">
             <p>⭐ {spot.avgStarRating || 'New'} · {spot.reviewCount} reviews</p>
             <p>{spot.city}, {spot.state}, {spot.country}</p>
        </div>
       
        <div className="spot-images">
    {console.log("Spot images:", spot.SpotImages)}
    {spot.SpotImages && spot.SpotImages[0] ? 
        <img src={spot.SpotImages[0].url} alt={spot.name} className="spot-image" /> : 
        <div>No image to show</div>
    }
</div>

        <div className="spot-host">
                <div className="host-info">
                    <div>Hosted by {spot.Owner?.firstName}</div>
                </div>

        <div className="spot-description">
                    {spot.description}
                </div>
              
               
         <div className="reservation-section">
               
        <div>${spot.price} night</div>
            <button onClick={() => {
                   alert('Rental coming soon!')
                }}>
                    Reserve</button>
                </div>
                </div>
            </div>
          
    );
}




export default SpotDetail;
