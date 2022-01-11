import { useTime } from '../contexts/TimeContext'
import { useAuth } from '../contexts/AuthContext'

const TimeLoader = ({ children }) => {

    const { elapsedTime } = useTime()
    const { loadingJSX } = useAuth()
    
    return elapsedTime ? children : loadingJSX;
}

export default TimeLoader
