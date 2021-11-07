import './MyProfile.css'
import { useState } from 'react'
import EditProfile from './EditProfile'
import AddPosts from './AddPosts'
import PostsProfile from './PostsProfile'
import url from '../../components/urlSettings'

const MyProfile = ({user}) => {

    const [open, setOpen] = useState(false)

    const date = new Date(user.date)
    return(
        <main className='myprofile-main'>
        <section className='myprofile-section'>
        <img src={`${url.serverUrl}/static/banner/${user.banner!== '' ? user.banner : 'default.jpeg'}`} alt='banner' style={{width: '100%',objectFit: 'cover'}}/>
        <img src={`${url.serverUrl}/static/profile/${user.img}`} alt='zdjęcie profilowe' style={{width: '150px', borderRadius: '50%', objectFit: 'cover'}}/>
        <button onClick={()=>setOpen(true)}>Edytuj</button>
        <span>{user.username}</span>
        <span>{user.followers} Obserwujących</span>
        <span>{user.follow} Obserwuje</span>
        <span>{user.email}</span>
        <span>Dołączył/a {date.getFullYear()}</span>
        <span>{user.desc}</span>
        <AddPosts/>
        {open && <EditProfile state={setOpen} img={user.img} banner={user.banner}/>}
        </section>
        <section className='posts-profile-section'>
            <PostsProfile id={user._id}/>
        </section>
        </main>
    )
}

export default MyProfile