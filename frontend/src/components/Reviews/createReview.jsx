import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createReview } from '../../store/reviews';

function createReview({spotId}){
    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (error) => {
        error.preventDefault();
        setErrors({});

        const reviewData = {
            review,
            stars
        };

        try{
            const response = await dispatch(createReview(spotId, reviewData));
            if (response) {
            closeModal();
            }
        }catch(error){
            setErrors({ "server": "Something went wrong... Please try again." });
        }


    }
};


return(
    <div className='review-form'>
        <h1>Tell us about your stay!</h1>

        <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Leave your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            <button             >

            </button>  
        </form>
    </div>
)

export default CreateReview;
// TODO ADD 1-5 STAR RATING
// ADD DIFFERENT FUNCTIONALITY TO STARS(hover, bold, pop out)