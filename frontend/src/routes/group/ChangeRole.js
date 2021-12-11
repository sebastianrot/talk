import { Button } from "@chakra-ui/button"
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
        <Button size='sm' onClick={()=>handleClick('admin')}>admin</Button>
        <Button size='sm' onClick={()=>handleClick('mod')}>mod</Button>
        <Button size='sm' onClick={()=>handleClick('user')}>usuń range</Button>
        </>
    )
}

export default ChangeRole