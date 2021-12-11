import { Button } from '@chakra-ui/button'
import url from '../../components/urlSettings'

const Leave = ({id}) => {
    const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/${id}/leave`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }

    return(
        <Button size='sm' colorScheme='red' onClick={handleClick}>Wyjdź</Button>
    ) 
}

export default Leave