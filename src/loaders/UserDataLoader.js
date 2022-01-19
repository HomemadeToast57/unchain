import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/js/Loading";
import BottomNav from "../components/js/BottomNav";

const UserDataLoader = ({ children }) => {
  const { currentUser, dataObj } = useAuth();
  const navigate = useNavigate();
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
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [currentUser, dataObj.timeStart]);

  return (
    <div>
      {ready ? (
        <>
          <BottomNav /> {children}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default UserDataLoader;
