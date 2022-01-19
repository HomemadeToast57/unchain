import { useTime } from "../contexts/TimeContext";
import Loading from "../components/js/Loading";

const TimeLoader = ({ children }) => {
  const { elapsedTime } = useTime();

  return elapsedTime ? children : <Loading/>;
};

export default TimeLoader;
