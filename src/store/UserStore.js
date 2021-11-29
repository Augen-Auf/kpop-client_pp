import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._firebaseUser = {};
        this._dbUser = {};
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setFirebaseUser(user) {
        this._firebaseUser = user
    }

    setDbUser(user) {
        this._dbUser = user
    }


    get isAuth() {
        return this._isAuth
    }

    get firebaseUser() {
        return this._firebaseUser
    }

    get dbUser() {
        return this._dbUser
    }
}
