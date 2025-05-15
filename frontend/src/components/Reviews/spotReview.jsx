import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import './review.css';
import CreateReview from './createReview';
// import DeleteReview from './deleteReview';
import { fetchSpotReviews } from '../../store/reviews';

function SpotReview({spot}) {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const currentUser = useSelector(state => state.session.user);
    const reviewsObj = useSelector(state => state.reviews.spot);
    const reviews = Object.values(reviewsObj || {});
    const isOwner = currentUser && spot && currentUser.id === spot.ownerId;
   
    useEffect(() => {
        console.log("fetching reviews for spot", spotId);
        
        if(spotId) {
            dispatch(fetchSpotReviews(spotId))
            .then(() => {
                console.log("got reviews");
              
            }) 
            .catch(err => {
                console.log("OH NOOOO:", err);
            });
        }
    }, [dispatch, spotId]);

    return(
        <div className='reviews-section'>
            <h2>
                <span className='star-icon'>*</span>
                <span className="star-icon">★</span>
                {spot.avgRating ? spot.avgRating.toFixed(1) : 'New'} 
                {reviews.length > 0 && (
                    <span> · {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</span>
                )}
            </h2>

            {currentUser && !isOwner && (
                <OpenModalButton
                    buttonText="Post Your Review"
                    modalComponent={<CreateReview spotId={spotId} />}
                />
            )}

        
        </div>
    );

}


// TO DO: WHAT IF THERE ARE NO REVIEWS??
// SHOW ALL REVIEWS
//USERS NEED TO BE ABLE TO DELETE

export default SpotReview;