import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createReview, fetchSpotReviews } from '../../store/reviews';
import './review.css';



function CreateReview({spotId}){
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState("");
     const [stars, setStars] = useState(0);
     const [hover, setHover] = useState(0);
     const [errors, setErrors] = useState({});

    
    const handleStarClick = (rating) => {
     setStars(rating);
    };

    const starHover = (rating) => {
        setHover(rating);
    };

    const starLeave = () => {
        setHover(0);
    };

    const makeStars = () => {
        const starsArray = [];
        for(
            let i = 1; i <= 5; i++) {
            starsArray.push(
                <span 
                    key={i}
                    className={`star ${i <= (hover || stars) ? 'filled' : 'empty'}`}
                    onClick={() => handleStarClick(i)}
                    onMouseEnter={() => starHover(i)}
                    onMouseLeave={starLeave}
                >
                    *
                     </span>
                     );
                }
            return (
                <div className="stars-container">
                  {starsArray}
                      <span>
                        {stars > 0 ? stars + " Stars" : "Select star rating"}
                      </span>
                </div>
                 );
    };
                

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (review.length < 10) {
            setErrors({ review: "Tell us how you really feel... in 10 characters or more" });
            return;
        }

        if (stars === 0) {
            setErrors({ stars: "Must pick a star rating!" });
            return;
        }

        const reviewData = {
            review: review,
            stars: stars
        };
        console.log("Submitting review:", reviewData);
       
       
        try{
            const result = await dispatch(createReview(spotId, reviewData));
            if (result) {
                await dispatch(fetchSpotReviews(spotId));
            closeModal();
            }
        }catch (error) {
            console.log("Error creating review:", error);
            setErrors({ server: "Something went wrong! Try again later."});
        
    }
};



return(
    <div className='review-form'>
        <h1>Tell us about your stay!</h1>

        {errors.server && <p className="error">{errors.server}</p>}


        <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Leave review here..."
                    value={review}
                    onChange={(event) => setReview(event.target.value)}
                />
            
            {errors.review && <p className="error">{errors.review}</p>}


        <div className="star-rating">
                    {makeStars()}
                </div>
                {errors.stars && <p className="error">{errors.stars}</p>}

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