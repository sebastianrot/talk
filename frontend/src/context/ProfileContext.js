import { useState, useEffect, createContext } from "react";
import url from "../components/urlSettings";

const ProfileContext = createContext()

const ProfileContextProvider = (props) => {
    const [myUser, setMyUser] = useState()
    const [loadingProfile, setLoadingProfile] = useState(true)

    const profileFetch = () => {
        fetch(`${url.serverUrl}/api/myprofile`, {credentials: 'include'})
            .then(res => res.json())
            .then(data => {
                setMyUser(data)
                setLoadingProfile(false)
            })
            .catch(err => {
                setLoadingProfile(false)
                return err})
    }

    useEffect(()=> {
        profileFetch()
    }, [])
console.log(myUser)
    return(
        <ProfileContext.Provider value={{myUser, loadingProfile}}>
            {props.children}
        </ProfileContext.Provider>)
}

export default ProfileContext
export {ProfileContextProvider}