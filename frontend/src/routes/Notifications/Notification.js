import {Link} from 'react-router-dom'
import { Text } from '@chakra-ui/react'
import { FaCircle } from 'react-icons/fa'
import Date from '../../components/posts/Date'
import url from '../../components/urlSettings'

const Notification = ({val, type}) =>{
    return(
        <>
        <Link to={type(val)}>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{width: '40px', height: '40px', marginRight: '6px'}}>
            <img src={`${url.serverUrl}/static/profile/${val.sender.img !== '' ? val.sender.img : 'default.jpg'}`}
                    alt='zdjęcie profilowe' style={{width: '100%', borderRadius: '50%', objectFit: 'cover'}}/>
            </div>
            <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <Text fontWeight='600' marginRight='3px'>{val.sender.username}</Text>
            <Text style={val.read ? {color: 'black'} : {color:'#1071fe'}}>{val.message}</Text>
            <Text style={{marginLeft: '6px'}}>{!val.read && <FaCircle fontSize='8px' color='#1071fe'/>}</Text>
            </div>
            <Date value={val.date}/>
            </div>
            </div>
        </Link>
        </>
    )
}

export default Notification