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
      .catch(error => {
        console.log("Error getting the spots:", error);
        setIsLoading(false);
        console.log("Got em!");
      });
  }, [dispatch]);

  if (isLoading) return <div>Loading spots...</div>;
    
 if (!user) {  
    navigate('/');
    return null;
  }

  const spots = spotsObj.Spots || [];
  const mySpots = spots.filter(spot => spot.ownerId === user.id);
  console.log("My spots:", mySpots);

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
     
              const previewImg = spot.SpotImages.find(img => img.preview === true);
              if (previewImg) {
                previewImage = previewImg.url;
              } else if (spot.SpotImages[0]) {
             
                previewImage = spot.SpotImages[0].url;
              }
            }
            
            // If no SpotImages array, fall back to direct properties
            if (!previewImage) {
              previewImage = spot.previewImage || spot.previewImg || '';
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
    <span className="spot-location">{spot.city}, {spot.state}</span>
    <span className="spot-rating">★ {spot.avgRating || 'New'}</span>
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