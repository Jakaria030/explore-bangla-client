import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateCurrentUser } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);

    // create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // update user
    const updateUser = (updateData) => {
        setLoading(true);
        return updateCurrentUser(auth.currentUser, updateData);
    };

    // sign out user
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };


    // holding the user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUsers(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };

    }, [users])


    // auth informations
    const authInfo = {
        loading,
        users,
        createUser,
        updateUser,
        signOutUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;