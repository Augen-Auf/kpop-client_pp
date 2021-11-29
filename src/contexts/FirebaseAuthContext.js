import { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../config/firebase-config'
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import UserStore from "../store/UserStore";
import {createUser, getUser} from "../http/userAPI";


const FirebaseAuthContext = createContext({
    userStore: {},
    signIn: () => Promise,
    signUp: () => Promise,
    signUpWithGoogle: () => Promise
})

export const useAuth = () => useContext(FirebaseAuthContext)

export function FirebaseAuthContextProvider({ children }) {
    const userStore = new UserStore()

    useEffect( () => {
        auth.onAuthStateChanged((unsubscribe) => {
            if(unsubscribe) {
                console.log(unsubscribe)
                unsubscribe.getIdToken().then((token) => {
                    localStorage.setItem("token", token)
                })

                userStore.setUser(unsubscribe)
                userStore.setIsAuth(true)
            }
        })
    }, [])

    async function signUp(email, nickname, password) {
        await createUserWithEmailAndPassword(auth, email, password).then(async (userCredentials) => {
            if(userCredentials) {
                console.log(userCredentials)
                const user = await updateProfile(userCredentials.user, {
                    displayName: nickname,
                })

                await createUser(userCredentials.user.uid,  nickname)

                userCredentials.user.getIdToken().then((token) => {
                    localStorage.setItem("token", token)
                })

                userStore.setUser(user)
                userStore.setIsAuth(true)
            }
        })
    }

    async function signUpWithGoogle() {
        await signInWithPopup(auth, new GoogleAuthProvider()).then( async (userCredentials) => {
            if(userCredentials) {
                console.log(userCredentials)
                let user = userCredentials.user
                const dbUser = await getUser(userCredentials.user.uid)
                if (dbUser) {
                    user = await updateProfile(user, {
                        displayName: userCredentials.user.email.split('@')[0],
                    })

                    await createUser(userCredentials.user.uid, userCredentials.user.email.split('@')[0])
                }

                userCredentials.user.getIdToken().then((token) => {
                    localStorage.setItem("token", token)
                })

                userStore.setUser(user)
                userStore.setIsAuth(true)
            }
        })
    }

    async function signIn(email, password) {
        await signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            if(userCredentials) {
                console.log(userCredentials)

                userCredentials.user.getIdToken().then((token) => {
                    localStorage.setItem("token", token)
                })

                userStore.setUser(userCredentials.user)
                userStore.setIsAuth(true)
            }
        })
    }

    const value = { userStore, signIn, signUp, signUpWithGoogle }
    return (
        <FirebaseAuthContext.Provider value={value}>
            { children }
        </FirebaseAuthContext.Provider>
    )
}
