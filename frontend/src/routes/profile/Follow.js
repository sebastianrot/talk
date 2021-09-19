import './Follow.css'
import {useState, useContext} from 'react'
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
        <button onClick={handleClick} style={follow ? 
             {backgroundColor: '#ffffff', color: '#3399FF'} : 
            {backgroundColor: '#3399FF', color: '#ffffff'}}
             className='follow-user-btn'>{follow ? 'Following' : '+ Follow'}</button>
    )
}

export default Follow