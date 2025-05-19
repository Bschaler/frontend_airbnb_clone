import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetail } from '../../store/spots'; 
import SpotReview from '../Reviews/spotReview';
import './Spots.css';


function SpotDetail() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const spot = useSelector(state => state.spots.singleSpot);
   
    //const currentUser = useSelector(state => state.session.user);
    
    
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

            useEffect(() => {
                if (spot) {
                    console.log("Full spot details:", spot);
                    console.log("Images:", spot.SpotImages);
                }
            }, [spot]);

    if (loading) return <div>LOADING...</div>
    if (err) return <div>Oh no: {err}</div>
    if (!spot) return <div>No spot found...</div>;

    const uniqueImages = spot.SpotImages ? [...new Map(
        spot.SpotImages.map(img => [img.url, img])
    ).values()] : [];
    const previewImage = uniqueImages.find(img => img.preview === true);
    const additionalImages = uniqueImages.filter(img => img.preview !== true);

    return( 
        
       
        <div className="spot-detail">
        <h1>{spot.name}</h1>
        
        <div className="spot-header">
             <p>⭐ {spot.avgStarRating || 'New'} · {spot.numReviews || 0} reviews</p>
             <p>{spot.city}, {spot.state}, {spot.country}</p>
        </div>
       
        <div className="spot-images">
                <div className="main-image-container">
                    {previewImage ? (
                        <img 
                            src={previewImage.url} 
                            alt={spot.name} 
                            className="main-spot-image" 
                        />
                    ) : (
                        <div className="no-image">No preview image available</div>
                    )}
                </div>
                
                <div className="additional-images-container">
                    {additionalImages.slice(0, 4).map((image, index) => (
                        <img 
                            key={index} 
                            src={image.url} 
                            alt={`${spot.name} ${index + 1}`}
                            className="additional-spot-image" 
                        />
                    ))}
                </div>
            </div>
     <div className="spot-content">                
        <div className="spot-host">
                <div className="host-info">
                <div>Hosted by {spot.Owner ? spot.Owner.firstName : ''}</div>
                </div>

        <div className="spot-description">
                    {spot.description}
                </div>
                </div>
        
                <div className="reservation-card">
                    <div className="price-rating-section">
                        <div className="price-display">
                            <span className="price-value">${spot.price}</span>
                            <span className="night-text"> night</span>
                        </div>
                        
                        <div className="rating-display">
                            <span className="star-icon">★</span>
                            <span className="rating-value">{spot.avgStarRating ? parseFloat(spot.avgStarRating).toFixed(1) : 'New'}</span>
                            <span className="dot"> · </span>
                            <span className="reviews-count">{spot.numReviews || 0} {spot.numReviews === 1 ? 'review' : 'reviews'}</span>
                        </div>
                    </div>
               
            
            <button
             className='reserve-button'
            onClick={() => {alert('Feature Coming Soon...')}}
            >
               Reserve
               </button>
           </div>
       </div>
       
       <div className="reviews-section">
           <SpotReview spot={spot} />
       </div>
   </div>
);
}




export default SpotDetail;
