import { Link } from 'react-router-dom';

function SpotCard({spot}){
    const locationDisplay = () => {
        if (!spot.city) return "Location is unavailable";
        if (spot.country && spot.country !== 'USA' && spot.country !== 'United States' && spot.country !== "United States of America") {
            return `${spot.city}, ${spot.state}, ${spot.country}`;
        }
    
        return `${spot.city}, ${spot.state}`;
    }



return(
    <Link to = {`/spots/${spot.id}`} className='spot-card-link'>

        <div className='spot-card' title={spot.name}>

            <div className='spot-image-container'>
                <img src = {spot.previewImage} alt = {spot.name} className='spot-image'/>
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
