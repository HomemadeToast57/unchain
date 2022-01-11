import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const UserDataLoader = ({ children }) => {
  const { currentUser, dataObj, loadingJSX } = useAuth();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (currentUser) {
      try {
        if (dataObj.timeStart.toJSON() !== undefined) {
          setReady(true);
        }
      } catch {
        setReady(false);
      }
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [currentUser, dataObj.timeStart]);

  if (ready) {
    return children;
  } else {
    return loadingJSX;
  }
};

export default UserDataLoader;
