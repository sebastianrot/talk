import { useState, useEffect, createContext } from "react";
import url from "../components/urlSettings";

const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [myUser, setMyUser] = useState({})
    const [logged, setLogged] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const auth = (data) => {
        if(data !== undefined) {
         return setLogged(true)
        } 
         return setLogged(false)
    }

    const loggedFetch = () => {
    
        fetch(`${url.serverUrl}/api/logged`, {credentials: 'include'})
            .then(res => res.json())
            .then(data => {
                auth(data)
                setMyUser(prev=>({...prev,...data}))
                setIsLoading(false)
            }).catch(err => {
                auth()
                setIsLoading(false)})
    }

    useEffect(()=> {
        loggedFetch()
    }, [])

    return(
        <AuthContext.Provider value={{myUser, isLoading, loggedFetch, logged}}>
            {props.children}
        </AuthContext.Provider>)
}

export default AuthContext
export {AuthContextProvider}