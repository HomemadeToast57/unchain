import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import "../components/css/LoadingRing.css";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { doc, getDoc } from "@firebase/firestore";

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
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    auth.signOut();
    return console.log("out");
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

  const updateDataState = async () => {
    try {
      const userDocRef = doc(db, "users", `${auth.currentUser.uid}`);
      const data = await getDoc(userDocRef).then((doc) => {
        return setDataObj(doc.data());
      });
      return data;
    } catch (error) {
      console.log("error: " + error);
    }
  };

  useEffect(() => {
    async function getData() {
      console.log("load");
      if (currentUser) {
        await updateDataState();
        console.log(dataObj);
        setLoading(false);
      }
    }

    getData();
  }, [currentUser]);

  //  async function getTimeDiff() {
  //   const past = (await dataObj.timeStart.toJSON().seconds) * 1000;
  //   let current = await new Date(
  //     firebase.firestore.Timestamp.now().seconds * 1000
  //   ).getTime();

  //   let diff = current - past;
  //   let seconds = Number(Math.floor(diff / 1000));

  //   var d = Math.floor(seconds / (3600 * 24));
  //   var h = Math.floor((seconds % (3600 * 24)) / 3600);
  //   var m = Math.floor((seconds % 3600) / 60);
  //   var s = Math.floor(seconds % 60);

  //   var dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
  //   // var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
  //   // var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
  //   // var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";

  //   return dDisplay + " " + h + ":" + m + ":" + s;
  // }

  // useEffect(() => {
  //   console.log(dataObj);
  //   setLoading(false);
  // }, [dataObj]);

  // useEffect(() => {
  //   getTimeDiff().then(res => console.log(res));
  //   console.log("Done");
  // }, [loading]);

  // async function getUserData() {
  //   const userDocRef = doc(db, "users", `${auth.currentUser.uid}`);
  //   try {
  //     const docSnap = await getDoc(userDocRef);
  //     if (docSnap.exists()) {
  //       setLoading(true);
  //       setDataObj(docSnap.data());
  //     } else {
  //       console.log("No such document found!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
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
  };

  const ready = () => {
    if (loading || !dataObj) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {!ready() && loadingJSX}
      {ready() && children}
    </AuthContext.Provider>
  );
}
