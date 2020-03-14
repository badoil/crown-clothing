import { takeLatest, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMyApp } from '../../firebase/firebase.utils'
import { fetchCollectionsSuccess, fetchCollectionsFailure } from '../../redux/shop/shop-action'

import shopActionsTypes from './shop-types';

export function* fetchCollectionsAsync(){
    try{
        const collectionRef = firestore.collection('collections')
        const snapshot = yield collectionRef.get()
        const collectionsMap = yield call(convertCollectionsSnapshotToMyApp, snapshot)
        yield put(fetchCollectionsSuccess(collectionsMap))
    }
    catch(error){
        yield put(fetchCollectionsFailure(error.message))
    }
}

export  function* fetchCollectionsStart() {
        yield takeLatest(
            shopActionsTypes.FETCH_COLLECTIONS_START,
            fetchCollectionsAsync
            )
    }