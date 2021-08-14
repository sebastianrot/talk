import './MyProfile.css'
import AddPhoto from "./AddPhoto"
import Desc from './Desc'
import AddPosts from './AddPosts'

const MyProfile = ({user}) => {
    return(
        <section className='myprofile-section'>
        <span>twoj profil</span>
        <span>{user.username}</span>
        <span>{user.email}</span>
        <AddPhoto/>
        <Desc/>
        <AddPosts/>
        </section>
    )
}

export default MyProfile