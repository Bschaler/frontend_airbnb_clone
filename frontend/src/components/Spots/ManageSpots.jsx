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
    console.log("Getting spots for the manage page.");
    dispatch(fetchSpots())
      .then(() => {
        setIsLoading(false);
        console.log("Got the spots!");
      })
      .catch(error => {
        console.log("Error getting the spots:", error);
        setIsLoading(false);
        console.log("Got spots!");
      });
  }, [dispatch]);

  if (isLoading) return <div>Loading spots...</div>;
    
 if (!user) {  
    navigate('/');
    return null;
  }

  const spots = spotsObj.Spots || [];
  const mySpots = spots.filter(spot => spot.ownerId === user.id);


  return (
    <div className="manage-spots-container">
      <h1>Manage Your Spots</h1>
      
      {mySpots.length === 0 ? (
        <div>
          <p>No listings yet.</p>
          <button onClick={() => navigate('/spots/new')}>Create a New Spot</button>
        </div>
      ) : (
        <div className="spots-container">
          {mySpots.map(spot => (
            <div key={spot.id} className="spot-card">
              <img 
                src={spot.previewImage}
                alt={spot.name} 
                className="spot-image"
                onClick={() => navigate(`/spots/${spot.id}`)}
              />
              <div className="spot-info">
                <p>{spot.city}, {spot.state}</p>
                <p>★ {spot.avgRating || 'New'}</p>
                <p>${spot.price} night</p>
                <div className="spot-buttons">
                  <button 
                    onClick={() => navigate(`/spots/${spot.id}/edit`)}
                  >
                    Update
                  </button>
                  <OpenModalButton 
                    buttonText="Delete"
                    modalComponent={<DeleteSpots spotId={spot.id} />}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageSpots;