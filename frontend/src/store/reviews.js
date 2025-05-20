import { csrfFetch } from './csrf';

const LOAD_SPOT_REVIEWS = "reviews/LOAD_SPOT_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";


export const loadSpotReviews = (reviews) => ({
    type: LOAD_SPOT_REVIEWS,
    reviews
  });
  
  export const addReview = (review) => ({
    type: ADD_REVIEW,
    review
  });
  
  export const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
  });

//thunkin time
export const fetchSpotReviews = (spotId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
        
        if (!response.ok) {
          throw new Error('Failed fetching reviews');
        }
        const data = await response.json();
        dispatch(loadSpotReviews(data.Reviews));
        return data.Reviews;
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    
    export const createReview = (spotId, reviewData) => async (dispatch) => {
        try {
            const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
              });
              if (!response.ok) {
                const error = await response.json();
                return Promise.reject(error);
              }
              const newReview = await response.json();
              dispatch(addReview(newReview));
              return newReview;
            } catch (error) {
              return Promise.reject(error);
            }
          };
          
          
          export const deleteReview = (reviewId) => async (dispatch) => {
            try {
              const response = await csrfFetch(`/api/reviews/${reviewId}`, {
                method: 'DELETE'
              });
              if (!response.ok) {
                throw new Error('Failed to delete review');
              }
              
              dispatch(removeReview(reviewId));
              return { message: 'Review successfully deleted' };
            } catch (error) {
              console.error('Error: cannot delete review', error);
            }
          };
          
          const initialState = {
            spot: {},
            user: {}
          };

          //REDUCTIONISM
     const reviewsReducer = (state = initialState, action) => {
            switch (action.type) {
              
                case LOAD_SPOT_REVIEWS: {
                const spotReviews = {};
                
            action.reviews.forEach(review => {
                  spotReviews[review.id] = review;
                });
                return {
                    ...state,
                    spot: spotReviews
                  };
                }


          case ADD_REVIEW:
            return {
                ...state,
                spot: {
                    ...state.spot, [action.review.id]: action.review
                }
            };

         case REMOVE_REVIEW: {
              const newSpotReviews = { ...state.spot };
                delete newSpotReviews[action.reviewId];
                return {
                  ...state,
                  spot: newSpotReviews
                };
              }

              default:
                return state;
            }
          };




export default reviewsReducer;