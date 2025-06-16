import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import DeleteSpots from './DeleteSpots';
import './Spots.css';

function ManageSpots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(state => state.session.user);
  const spotsObj = useSelector(state => state.spots.allSpots);

  useEffect(() => {
    console.log("Getting my rentals");
    dispatch(fetchSpots())
      .then(() => {
        setIsLoading(false);
        console.log("Got em!");
      })
  }, [dispatch]);

  if (isLoading) return <div>Loading spots...</div>;
    
 if (!user) {  
    navigate('/');
    return null;
  }

  const spots = spotsObj.Spots || [];
  const mySpots = spots.filter(spot => spot.ownerId === user.id);
  console.log("My spots:", mySpots);


  const locationDisplay = (spot) => {
    if (!spot.city) return "Location is unavailable";
    if (spot.country && spot.country !== 'USA' && spot.country !== 'United States' && spot.country !== "United States of America") {
        return `${spot.city}, ${spot.country}`;
    }
    return `${spot.city}, ${spot.state}`;
}

  return (
    <div className="manage-spots-container">
      <h1>Manage Your Rentals</h1>
      
      {mySpots.length > 0 && (
        <button 
          className="create-new-spot-button"
          onClick={() => navigate('/spots/new')}
        >
          Create a New Spot
        </button>
      )}
      {mySpots.length === 0 ? (
        <div>
          <p>No listings yet.</p>
          <button 
            className="create-new-spot-button"
            onClick={() => navigate('/spots/new')}
          >
            Create a New Spot
          </button>
          </div>
     
      ) : (
        <div className="spots-container">
          {mySpots.map(spot => {

            let previewImage = null;
            
            if (spot.SpotImages && spot.SpotImages.length > 0) {
              
                for (let i = 0; i < spot.SpotImages.length; i++) {
                    if (spot.SpotImages[i].preview === true) {
                        previewImage = spot.SpotImages[i].url;
                        break;
                    }
                }

                if (!previewImage && spot.SpotImages[0]) {
                    previewImage = spot.SpotImages[0].url;
                }
                }else if (spot.previewImage) {
                    
                    previewImage = spot.previewImage;
                }
             
        return (
              <div key={spot.id} className="spot-card">
              
                  <div 
                    className="spot-image-container"
                    onClick={() => navigate(`/spots/${spot.id}`)}
                  >
                    {previewImage ? (
                      <img 
                        src={previewImage}
                        alt={spot.name} 
                        className="spot-image"
                        onError={(e) => {
                          console.log("Image failed to load:", previewImage);
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/400x300?text=Image';
                        }}
                      />
                    ) : (
                      <div className="image-placeholder">
                        Image
                      </div>
                    )}
                  </div>
              
   <div className="spot-info">
    <div className="spot-top-row">
    <div className="spot-location">{locationDisplay(spot)}</div>
      <div className="spot-rating">
        <span className="star-icon">★</span>
        <span>{spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}</span>
        {spot.numReviews > 0 && (
          <span> · {spot.numReviews === 1 ? '1 review' : `${spot.numReviews} reviews`}</span>
  )}
</div>
</div>
  <div className="spot-price">${spot.price}/night</div>
</div>
            
             
             <div className="spot-actions">
                <button 
                  className="update-button"
                  onClick={() => navigate(`/spots/${spot.id}/edit`)}
                >
                    Update
                  </button>
                  <OpenModalButton 
                    buttonText="Delete"
                    className="delete-button"
                    modalComponent={<DeleteSpots spotId={spot.id} />}
                  />
                </div>
              </div>
         
                );
})}
        </div>
      )}
    </div>
  );
}

export default ManageSpots;