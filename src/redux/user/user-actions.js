import {userActionTypes} from './user.types'


export const setGoogleSignInStart = () => ({
    type: userActionTypes.SIGN_IN_WITH_GOOGLE_START
})

export const setEmailSignInStart = emailAndPassword => ({
    type: userActionTypes.SIGN_IN_WITH_EMAIL_START,
    payload: emailAndPassword
})

export const setSignInSuccess = user => ({
    type: userActionTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const setSignInFailure = error => ({
    type: userActionTypes.SIGN_IN_FAILURE,
    payload: error
})

export const setSignOutStart = () => ({
    type: userActionTypes.SIGN_OUT_START
})

export const setSignOutSuccess = () => ({
    type: userActionTypes.SIGN_OUT_SUCCESS
})

export const setSignOutFailure = () => ({
    type: userActionTypes.SIGN_OUT_FAILURE
})

export const setSignUpStart = userCredentials => ({
    type: userActionTypes.SIGN_UP_START,
    payload: userCredentials
})

export const setSignUpSuccess = ({user, additionalData}) => ({
    type: userActionTypes.SIGN_UP_SUCCESS,
    payload: {user, additionalData}
})

export const setSignUpFailure = error => ({
    type: userActionTypes.SIGN_UP_FAILURE,
    payload: error
})

export const setCheckUserSession = () => ({
    type: userActionTypes.CHECK_USER_SESSION
})
