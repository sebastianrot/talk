import { Button } from '@chakra-ui/button'
import url from '../../../components/urlSettings'

const Block = ({id, user}) => {

 const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/${id}/user/${user}/block`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return(
        <Button size='sm' colorScheme='red' marginTop='10px' onClick={handleClick}>Zablokuj</Button>
    )
}

export default Block