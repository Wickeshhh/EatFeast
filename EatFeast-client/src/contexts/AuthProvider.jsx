import React, { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup, // Import this
  signOut,
  getAuth,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign up with Gmail
  const signUpWithGmail = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Login with email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logOut = () => {
    return signOut(auth);
  };

  // Update profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // Check signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // get token and store client
        const userInfo = { email: currentUser.email };
        axios.post("/jwt", userInfo).then((response) => {
          // console.log(response.data.token)
          if (response.data.token) {
            localStorage.setItem("access_token", response.data.token);
          }
        });
      } else {
        localStorage.removeItem("access_token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    login,
    logOut,
    signUpWithGmail,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

//previously used code under

// import React, { createContext, useState, useEffect } from "react";
// import {
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   getAuth,
//   onAuthStateChanged,
//   updateProfile
// } from "firebase/auth";
// import app from "../firebase/firebase.config";

// export const AuthContext = createContext();
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // create accounts
//   const createUser = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   //signup with gmail
//   const signUpWithGmail = () => {
//     // setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   //login using email and password
//   const login = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   //logout
//   const logOut = () => {
//     // localStorage.removeItem('genius-token');
//     signOut(auth);
//   };

//   //update profile
//   const updateUserProfile = (name, photoURL) => {
//     return updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: photoURL,
//     });
//   };

//   //check signed in user
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (currentUser) {
//         setUser(currentUser);
//         setLoading(false);
//       } else {
//         // User is signed out
//         // ...
//       }
//     });
//     return () => {
//       return unsubscribe();
//     };
//   }, []);

//   const authInfo = {
//     user,
//     // loading,
//     createUser,
//     login,
//     logOut,
//     signUpWithGmail,
//     updateUserProfile,
//   };
//   return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
// };

// export default AuthProvider;
