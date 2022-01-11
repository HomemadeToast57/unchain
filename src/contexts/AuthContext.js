import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import "../components/css/LoadingRing.css";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { getDoc } from "@firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [dataObj, setDataObj] = useState({});
  const db = firebase.firestore();
  const usersRef = db.collection("users");

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
    usersRef.doc(auth.currentUser.uid).set({
      email: auth.currentUser.email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      timeStart: firebase.firestore.FieldValue.serverTimestamp(),
      pastHistory: [],
    });
  }

  useEffect(() => {
    const db = firebase.firestore();
    const usersRef = db.collection("users");

    const fetchData = async () => {
      const userRef = usersRef.doc(auth.currentUser.uid);
      const docSnapshot = await getDoc(userRef);
      console.log(docSnapshot.data());
      setDataObj(docSnapshot.data());
    };

    if (currentUser) {
      console.log("🚀");
      fetchData();
    }
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const loadingJSX = (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  const value = {
    currentUser,
    signup,
    login,
    checkEmail,
    logout,
    resetPassword,
    saveUser,
    dataObj,
    loadingJSX,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
