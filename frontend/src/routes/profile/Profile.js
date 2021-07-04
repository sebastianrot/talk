import {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import url from '../../components/urlSettings'
import ProfileContext from '../../context/ProfileContext'
import MyProfile from './MyProfile'
import ProfileNotExist from './ProfileNotExist'
import Loading from '../../components/Loading'

const Profile = () => {

    let { username } = useParams()
    const {myUser, loadingProfile} = useContext(ProfileContext)
    const [isExist, setIsExist] = useState(true)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${url.serverUrl}/api/user/${username}`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setUser(data)
            setIsExist(true)
            setLoading(false)
        })
        .catch(err => {
            setIsExist(false)
            setLoading(false)
            return err})
    }, [username])

 
    if(!isExist) return <ProfileNotExist/>

    if(loading || loadingProfile) return <Loading/>

    if(myUser.id === user.id_user) return <MyProfile user={myUser}/>

    return(
        <>
        <img src={`${url.serverUrl}${user.path}`} alt='zdjęcie profilowe' style={{width: '200px'}}/>
        <br />
        <span>{user.id}</span>
        <br />
        <span>{user.username}</span>
        <br />
        <span>{user.verified}</span>
        <br />
        <span>{user.email}</span>
        <br />
        <span>{user.date}</span>
        </>
    )
}

export default Profile