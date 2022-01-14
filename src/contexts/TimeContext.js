import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

export const TimeContext = createContext();

export const useTime = () => {
  return useContext(TimeContext);
};

export const TimeProvider = ({ children }) => {
  const db = firebase.firestore();
  const { currentUser, dataObj } = useAuth();
  const [objTime, setObjTime] = useState(dataObj.timeStart.toJSON().seconds);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeDisplay, setTimeDisplay] = useState("");
  const [timeObj, setTimeObj] = useState({});

  // useEffect(() => {
  //   setObjTime(dataObj.timeStart.toJSON().seconds);

  // }, [dataObj.timeStart]);

  useEffect(() => {
    if (objTime) {
      const interval = setInterval(async () => {
        setElapsedTime(await getTimeDiff(objTime));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [objTime]);

  useEffect(() => {
    //handle change in objTime
  }, [objTime]);

  useEffect(() => {
    //change circular progress bar
  }, [elapsedTime]);

  useEffect(() => {
    const display = async () => {
      const displayTime = () => {
        let seconds = Number(Math.floor(elapsedTime / 1000));

        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor((seconds % (3600 * 24)) / 3600);
        var m = Math.floor((seconds % 3600) / 60);
        var s = Math.floor(seconds % 60);

        setTimeObj({
          d: d,
          h: h,
          m: m,
          s: s,
        });

        // var dString = String(d).length !== 1 ? d : "0" + d;
        var hString = String(h).length !== 1 ? h : "0" + h;
        var mString = String(m).length !== 1 ? m : "0" + m;
        var sString = String(s).length !== 1 ? s : "0" + s;

        var finalStr = hString + ":" + mString + ":" + sString;

        return finalStr;
      };
      await setTimeDisplay(await displayTime());
    };

    return display();
  }, [elapsedTime]);

  async function getTimeDiff(liveSeconds) {
    const past = liveSeconds * 1000;
    let current = await new Date(
      firebase.firestore.Timestamp.now().seconds * 1000
    ).getTime();

    const timeDiff = current - past;

    return timeDiff;
  }

  const saveTime = async () => {
    console.log(objTime);
    const past = objTime * 1000;
    let current = await new Date(
      firebase.firestore.Timestamp.now().seconds * 1000
    ).getTime();

    let diff = current - past;
    console.log(("diff", diff));

    //add to past history
    let history = await dataObj.pastHistory;
    history.push({
      milliseconds: diff,
      time: firebase.firestore.Timestamp.now(),
    });
    console.log(history);
    console.log(history.length);
    //update past history

    console.log(currentUser.uid);
    await db.collection("users").doc(`${currentUser.uid}`).update({
      pastHistory: history,
      timeStart: firebase.firestore.Timestamp.now(),
    });

    //reset local time in state
    setObjTime(await firebase.firestore.Timestamp.now().toJSON().seconds);
    console.log("sent to past history");

    //update time start
    console.log("reset time");
  };

  const values = { elapsedTime, timeDisplay, saveTime, timeObj };

  //return provider
  return <TimeContext.Provider value={values}>{children}</TimeContext.Provider>;
};
