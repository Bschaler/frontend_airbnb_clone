import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserReviews } from '../../store/reviews';
import { Link } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteReview from './deleteReview';
import './review.css';


function ReviewIndex(){
    const dispatch = useDispatch();
    const reviewsObj = useSelector(state => state.reviews.user);
    let userReviews = [];

    if (reviewsObj){
        userReviews = Object.values(reviewsObj);
    }
    
    useEffect(() => {
        console.log("Getting user reviews...");
       
        dispatch(fetchUserReviews())
            .then(() => console.log("Got user reviews!"))
           
            .catch(err => console.log("Error getting reviews:", err));
    }, [dispatch]);


    function reviewDate(dateString){
        const date = new Date(dateString)
        const months = [
            "January", "February", "March", "April", "May",
             "June", "Julu", "August", "Septmber", "October", "November", "December"
        ];

        return months[date.getMonth()] + " " + date.getFullYear();

    }

    return(
        <div className="manage-reviews">
            <h1>Manage Reviews</h1>

            {userReviews.map(review => (
                <div key={review.id} className="review-item">
                    <h2>{review.Spot ? review.Spot.name : 'Spot Name'}</h2>
                    <p>{reviewDate(review.createdAt)}</p>
                    <p>{review.review}</p>
                    
                    <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteReview reviewId={review.id} />}
                    />
                </div>
            ))}
        </div>
);
}



export default ReviewIndex;