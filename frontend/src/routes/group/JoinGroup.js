import { useState } from 'react'
import { Button } from '@chakra-ui/button'
import ShareGroup from './ShareGroup'
import url from "../../components/urlSettings"

const JoinGroup = ({group, role}) => {
    const [join, setJoin] = useState(group.status)

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/${group._id}/join`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(data=>data.json())
        .then(res=>setJoin(res.join))
    }

    const text = (accept) => {
        if(accept === 'pending') return 'Oczekiwanie'
        if(accept=== 'reject') return 'Dołącz'
        if(accept === 'block') return 'Zablokowany'
    }

    if(join === 'accept') return <ShareGroup group={group} admin={role.admin}/> 

    return(
        <Button onClick={handleClick} variant={join === 'pending' ? 'outline' : 'solid'}
         colorScheme={join === 'block' ? 'red' : 'blue'}>{text(join)}</Button>
    )
}

export default JoinGroup