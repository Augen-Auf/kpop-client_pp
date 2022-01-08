import { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../config/firebase-config'
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import UserStore from "../store/UserStore";
import {createUser, getUser} from "../http/userAPI";


const FirebaseAuthContext = createContext({
    userStore: {},
    signIn: () => Promise,
    signUp: () => Promise,
    signUpWithGoogle: () => Promise,
    signOut: () => Promise
})

export const useAuth = () => useContext(FirebaseAuthContext)

export function FirebaseAuthContextProvider({ children }) {
    const userStore = new UserStore()

    useEffect( async () => {
        console.log('init')
        const authListener = auth.onAuthStateChanged(async (unsubscribe) => {
            if(unsubscribe) {
                try {
                    console.log(unsubscribe)
                    unsubscribe.getIdToken().then((token) => {
                        localStorage.setItem("token", token)
                    })
                    const dbUser = await getUser(unsubscribe.uid)
                    console.log(dbUser)
                    userStore.setFirebaseUser(unsubscribe)
                    userStore.setDbUser(dbUser)
                    userStore.setIsAuth(true)
                }
                catch (e) {
                    console.log('error')
                }
            }
        })

        return () => authListener()
    }, [])

    async function signUp(email, nickname, password) {
        await createUserWithEmailAndPassword(auth, email, password).then(async (userCredentials) => {
            if(userCredentials) {
                console.log(userCredentials)
                const user = await updateProfile(userCredentials.user, {
                    displayName: nickname,
                })

                const dbUser = await createUser(userCredentials.user.uid,  nickname)

                userCredentials.user.getIdToken().then((token) => {
                    localStorage.setItem("token", token)
                })

                userStore.setFirebaseUser(user)
                userStore.setDbUser(dbUser)
                userStore.setIsAuth(true)
            }
        })
    }

    async function signUpWithGoogle() {
        await signInWithPopup(auth, new GoogleAuthProvider()).then( async (userCredentials) => {
            if(userCredentials) {
                console.log(userCredentials)
                let user = userCredentials.user
                console.log(user)
                let dbUser = await getUser(userCredentials.user.uid)
                console.log(dbUser)
                if (!dbUser) {
                    user = await updateProfile(user, {
                        displayName: userCredentials.user.email.split('@')[0],
                    })

                    dbUser = await createUser(userCredentials.user.uid, userCredentials.user.email.split('@')[0])
                }

                userCredentials.user.getIdToken().then((token) => {
                    localStorage.setItem("token", token)
                })

                userStore.setFirebaseUser(user)
                userStore.setDbUser(dbUser)
                userStore.setIsAuth(true)
            }
        })
    }

    async function signIn(email, password) {
        await signInWithEmailAndPassword(auth, email, password).then(async (userCredentials) => {
            if(userCredentials) {
                console.log(userCredentials)

                userCredentials.user.getIdToken().then((token) => {
                    localStorage.setItem("token", token)
                })
                const dbUser = await getUser(userCredentials.user.uid)

                userStore.setFirebaseUser(userCredentials.user)
                userStore.setDbUser(dbUser)
                userStore.setIsAuth(true)
            }
        })
    }

    function signOut() {
        return auth.signOut()
    }

    const value = { userStore, signIn, signUp, signUpWithGoogle, signOut }
    return (
        <FirebaseAuthContext.Provider value={value}>
            { children }
        </FirebaseAuthContext.Provider>
    )
}
