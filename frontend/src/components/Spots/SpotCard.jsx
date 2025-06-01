import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Spots.css';

function SpotCard({spot}){
     console.log("Spot data:", spot);
    console.log("avgRating:", spot.avgRating);
    console.log("Reviews:", spot.Reviews);
    const [imageError, setImageError] = useState(false);
    const locationDisplay = () => {
        if (!spot.city) return "Location is unavailable";
        if (spot.country && spot.country !== 'USA' && spot.country !== 'United States' && spot.country !== "United States of America") {
            return `${spot.city}, ${spot.state}, ${spot.country}`;
        }
    
        return `${spot.city}, ${spot.state}`;
    }

    const handleImageError = () => {
        console.log("Image failed to load:", spot.previewImage);
        setImageError(true);
    }


    const getImageSource = () => {

        if (spot.previewImage && !imageError) {
            return spot.previewImage;
        }
        

        if (spot.SpotImages && spot.SpotImages.length > 0) {
            const previewImage = spot.SpotImages.find(img => img.preview === true);
            if (previewImage) return previewImage.url;
            return spot.SpotImages[0].url;
        }
    }

return(
    <Link to = {`/spots/${spot.id}`} className='spot-card-link'>

        <div className='spot-card' title={spot.name}>

            <div className='spot-image-container'>
                <img src={getImageSource()}  alt = {spot.name} className='spot-image' onError={handleImageError}/>
            </div>
            
            <div className='spot-info'>
                <div className='spot-location'>
                    {locationDisplay()}
                </div>
               
                <div className = 'spot-rating'>
                    <span className='star-icon'>★</span>
                    <span>{spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}</span>
                </div>

                <div className='spot-price'>
                    <span
                        className = 'price-value'> ${spot.price}
                    </span> night
                </div>
            </div>
        </div>




    </Link>
);
}

export default SpotCard;



    // Add in if not in usa to say country of where it is
