import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth"
import React, { useContext, useState, useEffect } from "react"
import { auth } from "../services/firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    async function login(email, password) {
        let error = undefined;
        const response = await signInWithEmailAndPassword(auth, email, password)
            .catch((err) => {
                error = { code: err.code, message: err.message }
            });
        if (error != undefined)
            return error;
        else
            return response;

    };

    function logout() {
        return signOut(auth);
    };

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function updateEmailService(email) {
        return updateEmail(currentUser, email)
    }

    function updatePasswordService(password) {
        return updatePassword(currentUser, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signUp,
        logout,
        resetPassword,
        updateEmailService,
        updatePasswordService
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
