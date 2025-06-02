import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReview } from '../../store/reviews';
import './review.css';

function DeleteReview({reviewId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({});
    const handleDelete = async () => {
      
        //console.log("Deleting review...", reviewId);

         try {
            const response = await dispatch(deleteReview(reviewId));
            console.log("Delete response:", response);

                closeModal();
              
            }catch (error) {
                // console.log ("Failed to delete", error);
                setErrors({server: "Oh no... we couldn't delete your review! Try again!" });
              }
            };


    function cancelDelete() {
            closeModal();
         }



return (
    <div className='delete-review-modal'>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this review?</p>
    
        {errors.server && <p className="error">{errors.server}</p>}
    
   
    <div className='button-container'>
        <button 
        onClick = {handleDelete} className='delete-button'>
              Yes (Delete Review)
        </button>

        <button onClick = {cancelDelete} className='cancel-button'>
           No (Keep Review)
        </button>
    </div>
    
    </div>
    

);
    
}

export default DeleteReview;


// ALMOST THERE... figure out why review is not posting