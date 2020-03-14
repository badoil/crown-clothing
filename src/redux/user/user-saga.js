import { all, call, takeLatest, put } from 'redux-saga/effects'
import { googleProvider, auth, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'

import { userActionTypes } from './user.types'
import { setSignInSuccess, setSignInFailure, setSignOutSuccess, setSignOutFailure, setSignUpSuccess, setSignUpFailure } from './user-actions'


export function* getSnapshotFromUserauth(userAuth, additionalData) {
    try{
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(setSignInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    }
    catch(error){
        yield put(setSignInFailure(error))
    }
}


export function* signInWithGoogle(){
    try{
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserauth(user);
    }
    catch(error){
        yield put(setSignInFailure(error))
    }
}

export function* signInWithEmail({payload: {email, password}}){
    try{
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserauth(user);
    }
    catch(err){
        yield put(setSignInFailure(err));
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserauth(userAuth);
    }
    catch(err){
        yield put(setSignInFailure(err))
    }
}

export function* signOut(){
    try{
        yield auth.signOut()
        yield put(setSignOutSuccess());
    }
    catch(error){
        yield put(setSignOutFailure(error));
    }
}

export function* signUp({payload: {email, password, displayName}}){
    try{
        const { user } =  yield auth.createUserWithEmailAndPassword(email, password);
        yield put(setSignUpSuccess({user, additionalData: {displayName}}))
    }
    catch(error){
        yield put(setSignUpFailure(error))
    }
}

export function* signInAfterSignUp({payload: {user, additionalData}}){
    yield getSnapshotFromUserauth(user, additionalData);
}


export function* onGoogleSignInStart (){
    yield takeLatest(userActionTypes.SIGN_IN_WITH_GOOGLE_START, signInWithGoogle)
}

export function* onEmailSignInStart(){
    yield takeLatest(userActionTypes.SIGN_IN_WITH_EMAIL_START, signInWithEmail)
}

export function* onCheckUserSession(){
    yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOut(){
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart(){
    yield takeLatest(userActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess(){
    yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}


export function* userSagas(){
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), 
          call(onCheckUserSession), call(onSignOut), call(onSignUpStart), call(onSignUpSuccess)])
}