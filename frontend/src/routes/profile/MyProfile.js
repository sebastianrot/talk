import './MyProfile.css'
import EditProfile from './EditProfile'
import AddPosts from './AddPosts'
import PostsProfile from './PostsProfile'
import url from '../../components/urlSettings'
import { useState } from 'react'

const MyProfile = ({user}) => {

    const [open, setOpen] = useState(false)

    const date = new Date(user.date)
    return(
        <main className='myprofile-main'>
        <section className='myprofile-section'>
        <img src={`${url.serverUrl}/static/profile/${user.photo}`} alt='zdjęcie profilowe' style={{width: '150px', borderRadius: '50%', objectFit: 'cover'}}/>
        <button onClick={()=>setOpen(true)}>Edytuj</button>
        <span>{user.username}</span>
        <span>{user.email}</span>
        <span>Dołączył/a {date.getFullYear()}</span>
        <span>{user.desc}</span>
        <AddPosts/>
        {open && <EditProfile state={setOpen} img={user.photo}/>}
        </section>
        <section className='posts-profile-section'>
            <PostsProfile id={user.id}/>
        </section>
        </main>
    )
}

export default MyProfile