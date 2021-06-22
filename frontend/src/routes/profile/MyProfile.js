import AddPhoto from "./AddPhoto"

const MyProfile = ({user}) => {
    return(
        <>
        <span>twoj profil</span>
        <br />
        <span>{user.username}</span>
        <br />
        <span>{user.email}</span>
        <AddPhoto/>
        </>
    )
}

export default MyProfile