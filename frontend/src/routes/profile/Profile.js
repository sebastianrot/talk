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
            setUser(data)
            setIsExist(true)
            setLoading(false)
        })
        .catch(err => {
            setIsExist(false)
            setLoading(false)})
    }, [username])

 
    if(loading || isLoading) return <Loading/>

    if(!isExist) return <ProfileNotExist/>
 
    if(logged && myUser.id === user._id) return <MyProfile user={user}/>

    const date = new Date(user.date)
    return(
        <main className='profile-main'>
        <section className='profile-section'>
        <img src={`${url.serverUrl}/static/banner/${user.banner!== '' ? user.banner : 'default.jpeg'}`} alt='banner' style={{width: '100%',objectFit: 'cover'}}/>
        <img src={user.img !== '' ? `${url.serverUrl}/static/profile/${user.img}` : `https://avatars.dicebear.com/api/initials/${user.username}.svg`} alt='zdjęcie profilowe' style={{width: '150px', borderRadius: '50%', objectFit: 'cover'}}/>
        <div>
        <span>{user.username}</span>
        {user.verified && <VerifiedLogo/>}
        </div>
        <span>{user.followers} Obserwujących</span>
        <span>{user.follow} Obserwuje</span>
        <span>{user.email}</span>
        <Follow id={user._id} followed={user.followed} key={user._id}/>
        <span>Dołączył/a {date.getFullYear()}</span>
        <span>{user.desc}</span>
        </section>
        <PostsProfile key={user._id} id={user._id}/>
        </main>
    )
}

export default Profile