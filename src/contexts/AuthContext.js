import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { getDoc } from "@firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNav from "../components/js/BottomNav";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [dataObj, setDataObj] = useState({});
  const [currentPage, setCurrentPage] = useState("Unchain");
  const db = firebase.firestore();
  const usersRef = db.collection("users");
  const navigate = useNavigate();
  const location = useLocation();

  function signup(email, password) {
    const register = async () => {
      await auth.createUserWithEmailAndPassword(email, password);
      await saveUser();
    };

    return register();
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function checkEmail(email) {
    return auth.fetchSignInMethodsForEmail(email);
  }

  function saveUser() {
    const save = async () => {
      const createdAtStamp = await firebase.firestore.Timestamp.now();
      const timeStartStamp = firebase.firestore.Timestamp.now();

      await usersRef.doc(auth.currentUser.uid).set({
        email: auth.currentUser.email,
        createdAt: createdAtStamp,
        timeStart: timeStartStamp,
        pastHistory: [],
        addictionType: "no-preference",
      });
    };

    return save();
  }

  useEffect(() => {
    const db = firebase.firestore();
    const usersRef = db.collection("users");

    const fetchData = async () => {
      const userRef = usersRef.doc(auth.currentUser.uid);
      const docSnapshot = await getDoc(userRef);
      setDataObj(docSnapshot.data());
    };

    if (currentUser) {
      console.log("🚀");
      fetchData();
    }
    setLoading(false);
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      
      if (user) {
        console.log("signed in");
      } else {
        console.log("signed out");
        setCurrentPage("Unchain");

        switch (location.pathname) {
          case "/":
            navigate("/login");
            break;
          case "/login":
            navigate("/login");
            break;
          case "/signup":
            navigate("/signup");
            break;
          case "/forgot-password":
            navigate("/forgot-password");
            break;
          default:
            navigate("/login");
        }

      }
      setCurrentUser(user);
      setDataObj({});
    });

    return unsubscribe;
    // eslint-disable-next-line
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    checkEmail,
    logout,
    resetPassword,
    saveUser,
    dataObj,
    loading,
    setLoading,
    setCurrentPage,
    currentPage,
    setDataObj,
  };

  return (
    <AuthContext.Provider value={value}>
      {currentUser && <BottomNav />}
      {!loading && children}
    </AuthContext.Provider>
  );
}
