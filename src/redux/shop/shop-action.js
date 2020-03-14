import shopActionsTypes from './shop-types';
import { firestore, convertCollectionsSnapshotToMyApp } from '../../firebase/firebase.utils'


export const fetchCollectionsStart = () => ({
    type: shopActionsTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = collectionsMap => ({
    type: shopActionsTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: shopActionsTypes.FETCH_COLLECTIONS_FEILURE,
    payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
    return(dispatch => {
        const collectionRef = firestore.collection('collections')
        dispatch(fetchCollectionsStart())

        collectionRef.get().then( snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMyApp(snapshot) 
            dispatch(fetchCollectionsSuccess(collectionsMap));
        }).catch(error=> dispatch(fetchCollectionsFailure(error.message)))
    })
}

//If redux-thunk middleware is enabled, anytime you attempt to dispatch a function
//instead of an object, the middleware will call that function with dispatch method
//itself as the first argument