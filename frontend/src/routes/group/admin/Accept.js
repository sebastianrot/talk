import { Button } from '@chakra-ui/button'
import url from '../../../components/urlSettings'

const Accept = ({id, user}) => {

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/${id}/user/${user}/accept`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return(
        <Button size='sm' colorScheme='green' marginTop='10px' onClick={handleClick}>Zaakceptuj</Button>
    )
}

export default Accept