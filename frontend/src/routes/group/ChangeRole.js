import url from "../../components/urlSettings"

const ChangeRole = ({id, user}) => {
    const handleClick = (role) => {
        fetch(`${url.serverUrl}/api/group/${id}/user/${user}/role/${role}`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }})
    }

    return(
        <>
        <button onClick={()=>handleClick('admin')}>admin</button>
        <button onClick={()=>handleClick('mod')}>mod</button>
        <button onClick={()=>handleClick('user')}>usuń range</button>
        </>
    )
}

export default ChangeRole