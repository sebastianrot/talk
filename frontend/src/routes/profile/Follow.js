import './Follow.css'
import {useState, useContext} from 'react'
import { Button } from '@chakra-ui/react'
import AuthContext from '../../context/AuthContext'
import url from "../../components/urlSettings"

const Follow = ({id, followed}) => {
    const {logged} = useContext(AuthContext)
    const [follow, setFollow] = useState(followed)

    const handleClick = () => {
        logged && (fetch(`${url.serverUrl}/api/user/${id}/${follow ? 'unfollow' : 'follow'}`,  {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
        })
        .then(res=> res.json())
        .then(data=> setFollow(data.follow))) 
    }

    return(
        <Button onClick={handleClick} variant={follow ? 'outline' : 'solid'} style={follow ? {color: '#1071fe', borderColor: '#1071fe'} : {background: '#1071fe', color: '#fff'}}>{follow ? 'Following' : 'Follow'}</Button>
    )
}

export default Follow