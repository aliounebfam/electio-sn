import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"
import { onSnapshot, query, where } from "firebase/firestore";
import { useContext, useState, useEffect, createContext } from "react"
import { voterCollectionRef } from "../services/dashboard/VoterService";
import { auth } from "../services/firebase"

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [currentDataUser, setCurrentDataUser] = useState();
    const [loading, setLoading] = useState(true);

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    async function login(email, password) {
        let error = undefined;
        const response = await signInWithEmailAndPassword(auth, email, password)
            .catch((err) => {
                error = { code: err.code, message: err.message };
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
        return sendPasswordResetEmail(auth, email);
    };

    function updateEmailService(email) {
        return updateEmail(currentUser, email);
    };

    function updatePasswordService(password) {
        return updatePassword(currentUser, password);
    };

    function reauthenticateUser(email, password) {
        const credential = EmailAuthProvider.credential(
            email,
            password
        );
        return reauthenticateWithCredential(currentUser, credential);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            const q = query(voterCollectionRef, where("emailAddress", "==", user?.email));
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setCurrentDataUser(doc.data());
                });
            });
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);


    const value = {
        currentUser,
        currentDataUser,
        login,
        signUp,
        logout,
        resetPassword,
        updateEmailService,
        updatePasswordService,
        reauthenticateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
