import AddPhoto from "./AddPhoto"
import Desc from './Desc'

const MyProfile = ({user}) => {
    return(
        <>
        <span>twoj profil</span>
        <br />
        <span>{user.username}</span>
        <br />
        <span>{user.email}</span>
        <AddPhoto/>
        <Desc/>
        </>
    )
}

export default MyProfile