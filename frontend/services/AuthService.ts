import { FirebaseApp, getApp } from "firebase/app";
import "../config/firebase.config"
import { 
    signInWithEmailAndPassword,
    signOut,
    getAuth,  
    Auth,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    updatePassword,
    onAuthStateChanged
} from "firebase/auth"


class AuthService {
    auth: Auth;

    constructor(firebaseApp: FirebaseApp) {
        this.auth = getAuth(firebaseApp)
    }

    async register(email: string, password: string) {
        try {
            const response = await createUserWithEmailAndPassword(this.auth, email, password)
            return { user: response.user }
        } catch (error:any) {
            return { error: error.message }
        }
    }

    async logout() {
        await signOut(this.auth)
    }

    async login(email: string, password: string) {
        try {
            const response = await signInWithEmailAndPassword(this.auth, email, password)
            return { user: response.user }
        } catch (error:any) {
            return { error: error.message }
        }
    }

    async resetPassword(email: string) {
        try {
            await sendPasswordResetEmail(this.auth, email, {url: `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/login`})
        } catch (error: any) {
            return error.message
        }
    }

    async updatePassword(password: string) {
        const user = this.auth.currentUser
        try {
            if (user) await updatePassword(user, password)
            else return

        } catch (error: any) {
            return error.message
        }
    }

    waitUserStateChange(callback: CallableFunction) {
        return onAuthStateChanged(this.auth, (user) => { callback(user) })
    }
} 

export default new AuthService(getApp())
