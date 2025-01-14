import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();


    // create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // update user
    const updateUserProfile = (updateData) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updateData);
    };

    // sign in user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // sign out user
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };


    // sing in with google
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };


    // holding the user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            if(currentUser){
                axiosPublic.post("/jwt", {email: currentUser.email})
                .then(dbRes => {
                    if(dbRes.data.token){
                        localStorage.setItem('access-token', dbRes.data.token);
                    }
                })
            }else{
                localStorage.removeItem('access-token');
            }

            setLoading(false);
        });

        return () => {
            unsubscribe();
        };

    }, [user])


    // auth informations
    const authInfo = {
        loading,
        user,
        setUser,
        createUser,
        updateUserProfile,
        signInUser,
        signOutUser,
        signInWithGoogle,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;