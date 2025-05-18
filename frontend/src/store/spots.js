import { csrfFetch } from './csrf';
const create_spot = 'spots/create_spot';
const get_spot = 'spots/get_spot';
const load_spot = 'spots/load_spot';
const get_spot_detail = 'spots/get_spot_detail';
const update_spot = 'spots/update_spot';
const delete_spot = 'spots/delete_spot';

export const createSpot = (spot) => ({type: create_spot, spot});
export const getSpot = (spot) => ({type: get_spot, spot});
export const loadSpot = (spot) => ({type: load_spot, spot});
export const getSpotDetail = (spot) => ({type: get_spot_detail, spot});
export const updateSpot = (spot) => ({type: update_spot, spot});
export const deleteSpot = (spot) => ({type: delete_spot, spot});

export const fetchSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();
            dispatch(loadSpot(spots));
    }
    };

// TODO: add error handling here later
export const fetchSpotDetail = (spotId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/spots/${spotId}`);
        
        if (response.ok) {
            const spotData = await response.json();
            dispatch(getSpotDetail(spotData));
        } else {
            console.log("couldn't get the spot");
        }
    } catch (event) {
        console.log("error getting spot:", event);
    }
};

export const makeSpot = (data) => async (dispatch) => {
    try{
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(createSpot(spot));
        return spot;
    } else {
        const error = await response.json();
        return Promise.reject(error); 
    }
} catch (error) {

    console.error("Error in makeSpot thunk:", error);
    return Promise.reject(error);
}
};


export const removeSpot = (spotId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            dispatch(deleteSpot(spotId));
            return { success: true };
        } else {
            const error = await response.json();
            return { success: false, error };
        }
    } catch (error) {
        console.log("Error:", error);
        return { success: false, error };
    }
};


export const editSpot = (spotId, data) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const spot = await response.json();
            dispatch(updateSpot(spot));
            return spot;
        } else {
            const error = await response.json();
            return Promise.reject(error);
        }
    } catch (error) {
        console.log("Error editing spot:", error);
        return Promise.reject(error);
    }
};

const initialState = {
    allSpots: { Spots: [] },
    singleSpot: null
};

const spotsReducer = (state = initialState, action) => {
    switch (action.type){
        case create_spot:
            return {
                ...state,
                allSpots: {
                    ...state.allSpots,
                    Spots: [action.spot, ...(state.allSpots.Spots || [])]
                }
            };

            case get_spot:
            return{...state,
                allSpots:action.spot
            };
        
            case load_spot:
            return{...state,
                allSpots:action.spot
         };

        case get_spot_detail:
            return{...state,
                singleSpot: action.spot
            };
        case update_spot:
            return{...state,
                    allSpots:action.spot
        };
        
        case delete_spot:
            return{...state,
                allSpots:action.spot
        };
        default:
      return state;
    }
};

export default spotsReducer;