import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { getDoc } from "@firebase/firestore";
import BottomNav from "../components/js/BottomNav";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "../components/js/Alert";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [alertMessage, setAlertMessage] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [dataObj, setDataObj] = useState({});
  const [currentPage, setCurrentPage] = useState({
    page: "",
    title: "Unchain.",
  });
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

  const logout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  const deleteAccount = async () => {

    try {
    //delete the user's data
    const user = auth.currentUser;
    const userRef = usersRef.doc(user.uid);
    await userRef.delete();

    //delete the account and all data
    await auth.currentUser.delete();
    await navigate("/about");

    } catch (error) {
      
      setAlertMessage("There was an error deleting your account. Please try again in a few minutes. If the problem persists, please contact us at jack@jacksinger.dev or @HomemadeToast57 on Twitter.");

      return false;

    //give the user a message that they have been deleted
    }
    setAlertMessage(
      "Your account has been deleted. We wish you all the best on your path towards reaching your goals! Keep going! ❤️."
    );

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
        if (location.pathname === "/login") {
          navigate("/login");
        } else {
          navigate("/about");
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
    deleteAccount,
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
      {(alertMessage !== "") && <Alert errorMessage={alertMessage} color={"green"} handleAlertClose={async ()=>{
        console.log("HELLO");
        await setAlertMessage("");
      }}/>
    }
      {currentUser &&
        currentPage.page !== "about" &&
        currentPage.page !== "privacy" && <BottomNav />}
      {!loading && children}
    </AuthContext.Provider>
  );
}
