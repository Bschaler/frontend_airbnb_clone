import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { removeSpot } from '../../store/spots';
import './Spots.css';

function DeleteSpots({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [error, setError] = useState(null);
    
    const handleDelete = async () => {
      // console.log("Deleting spot with id:", spotId);
      try {
        await dispatch(removeSpot(spotId));
        closeModal();
         

   
           // console.log("Spot deleted!");
        
        } catch (error) {
      console.log("Error deleting spot:", error);
      setError("Couldn't delete spot");
    }
  };

    return (
        <div className="delete-modal">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to remove this listing?</p>
          
          {error && <p className="error">{error}</p>}
          
          <div className="button-container">
                <button 
                    className="delete-button"
                    onClick={handleDelete}
                >
                    Yes (Delete Spot)
                </button>
                
                <button 
                    className="cancel-button"
                    onClick={closeModal}
                >
                    No (Keep Spot)
                </button>
          </div>
        </div>
      );
    }
    
    export default DeleteSpots;