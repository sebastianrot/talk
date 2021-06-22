import { useContext } from "react"
import url from "./urlSettings"
import AuthContext from "../context/AuthContext"

const LogOut = () => {

    const {loggedFetch} = useContext(AuthContext)

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/logout`, {credentials: 'include'})
        .then(()=> loggedFetch())
    }

    return(
        <button onClick={handleClick}>Wyloguj się</button>
    )
}

export default LogOut