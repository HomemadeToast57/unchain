import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/js/Loading";

const UserDataLoader = ({ children }) => {
  const { currentUser, dataObj } = useAuth();
  const [ready, setReady] = useState(false);


  /* ----------------------------- Check If Ready ----------------------------- */
  useEffect(() => {
    if (currentUser) {
      try {
        if (dataObj.timeStart.toJSON() !== undefined) {
          setReady(true);
        }
      } catch {
        setReady(false);
      }
    }
    // eslint-disable-next-line
  }, [currentUser, dataObj.timeStart]);



  return (
    <div className="pageContainer">{ready ? children : <Loading />}</div>
  );
};

export default UserDataLoader;
