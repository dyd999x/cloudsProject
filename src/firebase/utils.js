import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyCbZo2lZLl7LVZXPJubCrz1c8V7AoXdhQo",
    authDomain: "clouds-29b71.firebaseapp.com",
    projectId: "clouds-29b71",
    storageBucket: "clouds-29b71.appspot.com",
    messagingSenderId: "897905266743",
    appId: "1:897905266743:web:8cb3bb8b50a1b90bbdefb2",
    measurementId: "G-LDQJRMS2LV"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if( !userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            }) 
        }catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

export const countryExists = async (countryName) => {
    const countryRef = firestore.doc(`countries/${countryName}`);
    const snapShot = await countryRef.get()
    console.log(snapShot.exists)
    return snapShot.exists
}

export const checkIfUpdated = async (countryName, today) => {

    const countryRef = firestore.doc(`countries/${countryName}`);
    const snapShot = await countryRef.get()
    console.log(snapShot)
    const date = await snapShot.data().Date 
    return (date == today)
}


export const addCountry = async (country) => {
    console.log(country)
    const countryRef = firestore.doc(`countries/${country.Country}`);
    const countryDate = new Date(country.Date)
    let d = countryDate.getDate()
    if( d >=1 && d <= 9){
      d = '0'+ d
    }
    const date = countryDate.getFullYear()+'-'+(countryDate.getMonth()+1)+'-'+d

    const {Country, CountryCode, NewConfirmed, NewDeaths, NewRecovered, TotalDeaths,TotalRecovered, TotalConfirmed} = country

    try {
        await countryRef.set({
            Country,
            CountryCode,
            NewConfirmed,
            NewDeaths,
            NewRecovered,
            TotalConfirmed,
            TotalDeaths,
            TotalRecovered,
            Date: date
        }) 
    }catch (error) {
        console.log('error creating country', error.message);
    }
    

}

export const addNews = async({title,description,value,country, user}) => {
    const createdAt = new Date();
    if(value==='worldwide'){
        const ref = firestore.collection('news/worldwide/global')
        try {
            await ref.add({
                title,
                description,
                createdAt,
                user
            })
        }catch(error){
            console.log("error while trying to add global news..",error.message)
        }
    } else {
        const ref = firestore.collection(`news/countries/${country}`)
        try {
            await ref.add({
                title,
                description,
                country,
                createdAt,
                user
            })
        }catch(error){
            console.log("error while trying to add country news..",error.message)
        }
    }
   
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage()

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;