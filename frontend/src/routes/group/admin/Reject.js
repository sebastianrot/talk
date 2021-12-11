import { Button } from "@chakra-ui/button"
import url from "../../../components/urlSettings"

const Reject = ({id, user}) => {

 const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/${id}/user/${user}/reject`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return(
        <Button size='sm' onClick={handleClick}>Usuń</Button>
    )
}

export default Reject