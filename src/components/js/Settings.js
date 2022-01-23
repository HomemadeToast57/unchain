import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import firebase from "firebase/compat/app";
import "../css/Settings.css";
import moment from "moment";
import { useTime } from "../../contexts/TimeContext";
import { useNavigate } from "react-router-dom";

moment().format();

const Settings = () => {
  const { setCurrentPage, dataObj } = useAuth();
  const { updateUser } = useTime();
  const [settingsObj, setSettingsObj] = useState({});
  const [timeStart, setTimeStart] = useState(
    moment(dataObj.timeStart.toJSON().seconds * 1000).format()
  );
  const [timeStartISO, setTimeStartISO] = useState(
    timeStart.substring(0, timeStart.length - 9)
  );
  const navigate = useNavigate();


  useEffect(() => {
    setTimeStart(moment(dataObj.timeStart.toJSON().seconds * 1000).format());
    setTimeStartISO(timeStart.substring(0, timeStart.length - 9));
  }, [dataObj.timeStart, timeStart]);

  //init
  useEffect(() => {
    const getMaxTime = () => {
      //get time from 5 min ago to DOMString
      let time = moment().format();
      let timeISO = time.substring(0, time.length - 9);

      return timeISO;
    };

    const getMinTime = () => {
      //get time from 10 years ago to DOMString
      let time = moment().subtract(10, "years").format();
      let timeISO = time.substring(0, time.length - 9);

      return timeISO;
    };

    //set dropdown
    document.getElementById("addictionType").value = dataObj.addictionType;

    let datePicker = document.getElementById("timeStart");
    datePicker.value = timeStartISO;
    datePicker.max = getMaxTime();
    datePicker.min = getMinTime();
    datePicker.getAttribute("min");

    //eslint-disable-next-line
  }, [timeStart, timeStartISO]);

  const updateSettingsObj = async (e) => {
    let settingsObjCopy = { ...settingsObj };

    switch (e.target.name) {
      case "timeStart":
        const oldDate = moment(timeStartISO).toDate();
        const newDate = moment(e.target.value).toDate();

        if (oldDate.getTime() !== newDate.getTime()) {
          settingsObjCopy = {
            ...settingsObjCopy,
            timeStart: firebase.firestore.Timestamp.fromDate(newDate),
          };
        } else {
          delete settingsObjCopy["timeStart"];
        }
        break;
      case "addictionType":
        if (dataObj.addictionType !== e.target.value) {
          settingsObjCopy = {
            ...settingsObjCopy,
            addictionType: e.target.value,
          };
        } else {
          delete settingsObjCopy["addictionType"];
        }
        break;

      default:
        return;
    }

    await setSettingsObj(settingsObjCopy);
  };

  const resetForm = () => {
    setSettingsObj({});

    let datePicker = document.getElementById("timeStart");
    datePicker.value = timeStartISO;

    document.getElementById("addictionType").value = dataObj.addictionType;
  };

  const saveSettings = async (e) => {
    e.preventDefault();

    if (Object.keys(settingsObj).length > 0) {
      await updateUser(settingsObj);
      await setSettingsObj({});
    }
    await setCurrentPage({
      page: "home",
      title: "Unchain",
    });
    return navigate("/");
  };

  return (
    <div className="settings">
      <div className="settingsDiv">
        <form className="settingsForm" onSubmit={saveSettings}>
          <div className="settingsItem addictionOption">
            {/* dropdown input */}
            <label className="settingLabel" htmlFor="addictionType">
              Addiction Type:{" "}
            </label>
            <select
              className="dropdown settingsInput"
              onChange={updateSettingsObj}
              id="addictionType"
              name="addictionType"
            >
              <option value="no-preference">Prefer Not To Say</option>
              <option value="alcohol">Alcohol</option>
              <option value="pornography">Porn</option>
              <option value="drug">Drug</option>
              <option value="sex">Sex</option>
              <option value="nicotine">Nicotine</option>
              <option value="gambling">Gambling</option>
            </select>
            <p className="settingNote">Note: If an addiction type is selected, the panic button will route you with resources that correspond with your addiction.</p>
          </div>
          <div className="settingsItem">
            {/* datetime picker */}
            <label className="settingLabel" htmlFor="timeStart">
              Start date and time:
            </label>

            <input
              className="settingsInput"
              onChange={updateSettingsObj}
              type="datetime-local"
              id="timeStart"
              name="timeStart"
            ></input>
          </div>
          <div
            className={`settingsButtonsContainer ${
              Object.keys(settingsObj).length > 0
                ? "changesMade" : ""}`}
          >
            <button type="submit">Save</button>
            {Object.keys(settingsObj).length > 0 && (
              <button id="undo-btn" onClick={resetForm} type="button">
                Undo
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
