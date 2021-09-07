import './Profile.css'
import {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import url from '../../components/urlSettings'
import ProfileContext from '../../context/ProfileContext'
import MyProfile from './MyProfile'
import ProfileNotExist from './ProfileNotExist'
import Post from '../../components/posts/Post'
import Loading from '../../components/Loading'
import { ReactComponent as VerifiedLogo} from '../../components/svg/verified.svg'

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

     const posts = user.posts.map((current)=> <Post key={current._id} value={current} user={user}/>)
     
    if(myUser.id === user.id) return <MyProfile user={user} post={posts}/>

    const date = new Date(user.date)
     console.log(user)
    return(
        <main className='profile-main'>
        <section className='profile-section'>
        <img src={`${url.serverUrl}/static/profile/${user.img !== '' ? user.img : 'default.jpeg'}`} alt='zdjęcie profilowe' style={{width: '150px', borderRadius: '50%', objectFit: 'cover'}}/>
        <div>
        <span>{user.username}</span>
        {user.verified && <VerifiedLogo/>}
        </div>
        <span>{user.email}</span>
        <span>Dołączył/a {date.getFullYear()}</span>
        <span>{user.desc}</span>
        </section>
        <section className='posts-profile-section'>
        {posts}
        </section>
        </main>
    )
}

export default Profile