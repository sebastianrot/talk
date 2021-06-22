import {createContext, useState, useEffect} from 'react'
import url from '../components/urlSettings'

const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [logged, setLogged] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const loggedFetch = () => {
        fetch(`${url.serverUrl}/api/logged`, {
            credentials: 'include'
          })
        .then(res => res.json())
        .then(data => {
            setLogged(data.auth)
            isLoading(false)
        })
        .catch(err => setIsLoading(false))
    }

    useEffect(() => {
        loggedFetch()
    }, [])

    return(
    <AuthContext.Provider value={{logged, isLoading, loggedFetch}}>
        {props.children}
    </AuthContext.Provider>)
}

export default AuthContext
export {AuthContextProvider}