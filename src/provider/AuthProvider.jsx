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
                // get user role
                const user = {email: currentUser.email};

                const createJWT = async () => {
                    const dbGetRes = await axiosPublic.get(`/users/role?email=${currentUser.email}`)
                    user.role = dbGetRes.data?.role;
                    
                    const dbRes = await axiosPublic.post("/jwt", user)
                    if(dbRes.data.token){
                            localStorage.setItem('access-token', dbRes.data.token);
                    }
                }

                createJWT();
            }else{
                localStorage.removeItem('access-token');
            }

            setLoading(false);
        });

        return () => {
            unsubscribe();
        };

    }, [user, setUser])


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