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
    const reviews = useSelector(state => state.reviews.spot);
   const reviewsArray = Object.values(reviews || {});
    const [avgRating, setAvgRating] = useState('New');
    const [reviewText, setReviewText] = useState('');

    
    useEffect(() => {
        const getSpot = async () => {
                    try {
                        console.log(`Trynna fetch spot ${spotId}`);
                       
                        await dispatch(fetchSpotDetail(spotId));
                        setLoading(false);
                        
                        console.log("Got the spot!");
                    
                    } catch (error) {
                        console.log("WRONG", error);
                       
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

            useEffect(() => {
        if (reviewsArray && reviewsArray.length > 0) {
            let totalStars = 0;
            for (let i = 0; i < reviewsArray.length; i++) {
                totalStars = totalStars + reviewsArray[i].stars;
            }
            let average = totalStars / reviewsArray.length;
            setAvgRating(average.toFixed(1));
            
            if (reviewsArray.length === 1) {
                setReviewText('1 review');
            } else {
                setReviewText(reviewsArray.length + ' reviews');
            }
        } else {
            setAvgRating('New');
            setReviewText('');

        }
    }, [reviewsArray]);

   

    if (loading) return <div>LOADING...</div>
    if (err) return <div>Oh no: {err}</div>
    if (!spot) return <div>No spot found...</div>;

const locationDisplay = () => {
    if (!spot.city) return "Location is unavailable";

    if (spot.country && spot.country !== 'USA' && spot.country !== 'United States' && spot.country !== "United States of America") {
        return `${spot.city}, ${spot.country}`;
    }
    return `${spot.city}, ${spot.state}`;
}

   const uniqueImages = [];
    if (spot.SpotImages) {
        const urls = {};
        for (let i = 0; i < spot.SpotImages.length; i++) {
            if (!urls[spot.SpotImages[i].url]) {
                urls[spot.SpotImages[i].url] = true;
                uniqueImages.push(spot.SpotImages[i]);
            }
        }
    }
    
    let previewImage = null;
    let additionalImages = [];
    
    for (let i = 0; i < uniqueImages.length; i++) {
        if (uniqueImages[i].preview === true) {
            previewImage = uniqueImages[i];
        } else {
            additionalImages.push(uniqueImages[i]);
        }
    }

    
  
    return( 
        
       
        <div className="spot-detail">
        <h1>{spot.name}</h1>
        
     <div className="spot-header">
    <p>{locationDisplay()}</p>
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
                <div>Hosted by {spot.Owner ? `${spot.Owner.firstName} ${spot.Owner.lastName}` : ''}</div>
                </div>

        <div className="spot-description">
                    {spot.description}
                </div>
                </div>
        
                <div className="reservation-card">
          <div className="price-rating-container">
            <div className="price-display">
              <span className="price-value">${spot.price}</span>
              <span className="price-unit">night</span>
            </div>
            
          <div className="rating-display">
   <h2><span className="star-icon">★</span>
    {avgRating} · {reviewText}</h2>
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
    <div className="reviews-heading">
        <h2><span className="star-icon">★</span> {avgRating} · {reviewText}</h2>
    </div>

    <SpotReview spot={spot} />
</div>
        </div>
    );
}





export default SpotDetail;
