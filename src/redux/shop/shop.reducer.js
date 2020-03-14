import shopActionsTypes from './shop-types';


const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: undefined
}

const ShopReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case shopActionsTypes.FETCH_COLLECTIONS_START:
            return{
                ...state,
                isFetching: true
            }
        case shopActionsTypes.FETCH_COLLECTIONS_SUCCESS:
            return{
                ...state,
                isFetching:false,
                collections: action.payload

            }
        case shopActionsTypes.FETCH_COLLECTIONS_FEILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }

        default:
            return state;
    }
}

export default ShopReducer;