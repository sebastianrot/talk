import {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import url from '../../components/urlSettings'
import ProfileContext from '../../context/ProfileContext'
import MyProfile from './MyProfile'
import ProfileNotExist from './ProfileNotExist'
import Loading from '../../components/Loading'

const Profile = () => {

    let { id } = useParams()
    const {myUser, loadingProfile} = useContext(ProfileContext)
    const [isExist, setIsExist] = useState(true)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${url.serverUrl}/api/profile/${id}`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setLoading(false)
            setUser(data)
        })
        .catch(err => {
            setLoading(false)
            setIsExist(false)
            return err})
    }, [id])

    console.log(user)
    if(!isExist) return <ProfileNotExist/>

    if(loading || loadingProfile) return <Loading/>

    if(myUser.id === user.id) return <MyProfile user={myUser}/>

    return(
        <>
        <span>{user.id}</span>
        <br />
        <span>{user.username}</span>
        <br />
        <span>{user.email}</span>
        <br />
        <span>{user.date}</span>
        </>
    )
}

export default Profile