import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import './review.css';
import CreateReview from './createReview';
import DeleteReview from './deleteReview';
import { fetchSpotReviews } from '../../store/reviews';

function SpotReview({spot}) {

    const dispatch = useDispatch();
    const { spotId } = useParams();
    const currentUser = useSelector(state => state.session.user);
    const reviewsObj = useSelector(state => state.reviews.spot);
    

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
    
    if (!spot) return null;
    
    const reviews = Object.values(reviewsObj || {});
        const isOwner = currentUser && spot && currentUser.id === spot.ownerId;

    
    
    function formatReviewDate(dateString) {
        let date = new Date(dateString);
        let month = date.toLocaleString('en-US', { month: 'long' });
        let year = date.getFullYear();
        return month + ' ' + year;
    }
return(
        <div>
        

            {currentUser && !isOwner && (
                <OpenModalButton
                    buttonText="Post Your Review"
                    modalComponent={<CreateReview spotId={spotId} />}
                    className="post-review-button"  
                />
            )}

<div className="reviews-list">
                {reviews.length > 0 ? (
                    reviews.sort(function(a, b) {
                        let dateA = new Date(a.createdAt);
                        let dateB = new Date(b.createdAt);
                        return dateB - dateA; 
                 })
                        .map(review => (
                        <div key={review.id} className="review-item">
                            <h3>{(review.User && review.User.firstName) || 'Anonymous'}</h3>
                            <p>{formatReviewDate(review.createdAt)}</p>
                            <p>{review.review}</p>
                            {currentUser && currentUser.id === review.userId && (
                                <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<DeleteReview reviewId={review.id} />}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <p>Be the first to post a review!</p>
                )}
            </div>
        </div>
    );
}



// TO DO: WHAT IF THERE ARE NO REVIEWS??
// SHOW ALL REVIEWS
//USERS NEED TO BE ABLE TO DELETE

export default SpotReview;