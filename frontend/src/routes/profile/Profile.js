import './Profile.css'
import {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import url from '../../components/urlSettings'
import AuthContext from '../../context/AuthContext'
import MyProfile from './MyProfile'
import PostsProfile from './PostsProfile'
import ProfileNotExist from './ProfileNotExist'
import Loading from '../../components/Loading'
import Follow from './Follow'
import { ReactComponent as VerifiedLogo} from '../../components/svg/verified.svg'

const Profile = () => {

    let { username } = useParams()
    const {myUser, logged, isLoading} = useContext(AuthContext)
    const [isExist, setIsExist] = useState(true)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${url.serverUrl}/api/user/${username}`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setUser(data.user)
            setIsExist(true)
            setLoading(false)
        })
        .catch(err => {
            setIsExist(false)
            setLoading(false)})
    }, [username])

 
    if(loading || isLoading) return <Loading/>

    if(!isExist) return <ProfileNotExist/>
 
    if(logged && myUser.id === user.id) return <MyProfile user={user}/>

    const date = new Date(user.date)
     console.log(user)
    return(
        <main className='profile-main'>
        <section className='profile-section'>
        <img src={`${url.serverUrl}/static/profile/${user.photo!== '' ? user.photo : 'default.jpeg'}`} alt='zdjęcie profilowe' style={{width: '150px', borderRadius: '50%', objectFit: 'cover'}}/>
        <div>
        <span>{user.username}</span>
        {user.verified && <VerifiedLogo/>}
        </div>
        <span>{user.email}</span>
        <Follow id={user.id} followed={user.followed} key={user.id}/>
        <span>Dołączył/a {date.getFullYear()}</span>
        <span>{user.desc}</span>
        </section>
        <PostsProfile id={user.id}/>
        </main>
    )
}

export default Profile