import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createReview } from '../../store/reviews';

function CreateReview({spotId}){
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState("");
    // const [stars, setStars] = useState(5);
   const [errors, setErrors] = useState({});
// const currentUser = useSelector(state => state.session.user);
    const handleSubmit = async (error) => {
        error.preventDefault();
        setErrors({});

        const reviewData = {
            review,
            stars: 5
        };

        try{
            const response = await dispatch(createReview(spotId, reviewData));
            if (response) {
            closeModal();
            }
        }catch(error){
            setErrors({ server: "Something went wrong... Please try again." });
        


    }
}



return(
    <div className='review-form'>
        <h1>Tell us about your stay!</h1>

        {errors.server && <p className="error">{errors.server}</p>}


        <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Leave your review here..."
                    value={review}
                    onChange={(error) => setReview(error.target.value)}
                />
                <div>
                <p>Rating: 5 stars</p> 
                </div>
            <button  type = "submit" >
                SUBMIT
            </button>  
        </form>
    </div>
);
}
export default CreateReview;
// TODO ADD 1-5 STAR RATING
// ADD DIFFERENT FUNCTIONALITY TO STARS(hover, bold, pop out
// ALSO TODO, IMPLEMENT STAR, setSTAR