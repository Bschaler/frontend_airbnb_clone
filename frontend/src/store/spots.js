const create_spot = 'spots/create_spot';
const get_spot = 'spots/get_spot';
const load_spot = 'spots/load_spot';
const update_spot = 'spots/update_spot';
const delete_spot = 'spots/delete_spot';

export const createSpot = (spot) => ({type: create_spot, spot});
export const getSpot = (spot) => ({type: get_spot, spot});
export const loadSpot = (spot) => ({type: load_spot, spot});
export const updateSpot = (spot) => ({type: update_spot, spot});
export const deleteSpot = (spot) => ({type: delete_spot, spot});

export const fetchSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');

if (response.ok) {
    const spots = await response.json();
    dispatch(loadSpot(spots));
}
};
const spotsReducer = (state = {}, action) => {
    switch (action.type){
        case create_spot:
            return{...state,
                allSpots: [action.spot, ...state.allSpots]
            };

        case get_spot:
            return{...state,
                allSpots:action.spot
            };
        case load_spot:
            return{...state,
                allSpots:action.spot
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