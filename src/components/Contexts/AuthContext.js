import React, { useContext, useEffect, useState }  from 'react';
import { auth } from '../../Firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, updatePassword } from "firebase/auth";
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    async function login(email, password, adminID) {
        //return signInWithEmailAndPassword(auth, email, password);
        const result = await signInWithEmailAndPassword(auth, email, password);
        if (result) {
            const adminProfileRef = doc(db, "admin-profile", result.user.uid);
            const adminProfileSnap = await getDoc(adminProfileRef);
            if (adminProfileSnap.exists()) {
                if (adminProfileSnap.data().adminID !== adminID) {
                    logout();
                    return "Password or Admin ID Incorrect"
                } else {
                    return ""
                }
            }
        } else {
            return "Password or Admin ID Incorrect"
        }
    }

    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function updateFirebaseEmail(email) {
        return updateEmail(currentUser,email);
    }

    function updateFirebasePassword(password) {
        return updatePassword(currentUser,password);
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, [])
    

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateFirebaseEmail,
        updateFirebasePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}