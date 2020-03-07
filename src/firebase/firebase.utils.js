import firebase from 'firebase/app';
import 'firebase/firestore'; 
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAalitbzhv0N67x44XRJIbLsp85jqcH_IM",
    authDomain: "crown-clothing-db-d3680.firebaseapp.com",
    databaseURL: "https://crown-clothing-db-d3680.firebaseio.com",
    projectId: "crown-clothing-db-d3680",
    storageBucket: "crown-clothing-db-d3680.appspot.com",
    messagingSenderId: "64898471250",
    appId: "1:64898471250:web:d24334f765f05da5c6168b",
    measurementId: "G-MMHXQEEVV3"
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if(!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`)
      const userSnapshot = await userRef.get()

      

      if(!userSnapshot.exists){
        const { email, displayName } = userAuth
        const createdAt = new Date();
        try{
            await userRef.set({
                email,
                displayName,
                createdAt,
                ...additionalData
            })
        }  
        catch(error){
            console.log(error)
        }
      }
      return userRef;
  }

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase;