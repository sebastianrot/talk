import './MyProfile.css'
import EditProfile from './EditProfile'
import AddPosts from './AddPosts'
import url from '../../components/urlSettings'
import { useState } from 'react'

const MyProfile = ({user, post, test}) => {

    const [open, setOpen] = useState(false)

    const date = new Date(user.date)
    return(
        <main className='myprofile-main'>
        <section className='myprofile-section'>
        <img src={`${url.serverUrl}/static/profile/${user.img}`} alt='zdjęcie profilowe' style={{width: '150px', borderRadius: '50%', objectFit: 'cover'}}/>
        <button onClick={()=>setOpen(true)}>Edytuj</button>
        <span>{user.username}</span>
        <span>{user.email}</span>
        <span>Dołączył/a {date.getFullYear()}</span>
        <span>{user.desc}</span>
        <AddPosts/>
        {open && <EditProfile state={setOpen} img={user.image}/>}
        </section>
        <section className='posts-profile-section'>
            {post}
        </section>
        </main>
    )
}

export default MyProfile