import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import url from "./urlSettings"

const LogOut = () => {

    const {loggedFetch} = useContext(AuthContext)

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/logout`, {credentials: 'include'})
        .then(()=> loggedFetch())
    }

    return(
        <span onClick={handleClick}>Wyloguj się</span>
    )
}

export default LogOut