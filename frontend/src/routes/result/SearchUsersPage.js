import './SearchUsersPage.css'
import NavSearch from "./NavSearch"
import {useHistory} from 'react-router-dom'
import { Tooltip, Text } from '@chakra-ui/react'
import { ReactComponent as VerifiedLogo} from '../../components/svg/verified.svg'
import url from '../../components/urlSettings'

const SearchUsersPage = ({value}) => {
    let history = useHistory()

    const partText = (str) => {
        if (str.length > 40) {
            return (str.substring(0, 40) + "...");
        }
        else {
            return str;
        }
    }

    const result = value.map(val=>(<div className='searchuserpage-div' key={val._id} onClick={()=>history.push(`/user/${val.username}`)}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
    <img src={val.img !== '' ? `${url.serverUrl}/static/profile/${val.img}` : `https://avatars.dicebear.com/api/initials/${val.username}.svg`} alt='profile' style={{width: '42px', borderRadius: '50%'}}/>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px', justifyContent: 'center'}}>
    <div style={{display: 'flex', alignItems: 'center'}}>
    <Text fontSize='md' fontWeight='600'>{val.username}</Text>
    <div style={{marginLeft: '3px'}}>
    {val.verified && <Tooltip hasArrow label='weryfikacja'><VerifiedLogo/></Tooltip>}
    </div>
    </div>
    <Text fontSize='sm'>{partText(val.desc)}</Text>
    </div>
    </div>))

    return(
        <section className='searchuserspage-section'>
            <NavSearch/>
            {result}
        </section>
    )
}

export default SearchUsersPage