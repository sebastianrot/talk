import './SearchResult.css'
import { useHistory } from "react-router-dom"
import { Text, Tooltip } from '@chakra-ui/react'
import { ReactComponent as VerifiedLogo} from '../svg/verified.svg'
import url from '../urlSettings'

const SearchResult = ({val}) => {
    let history = useHistory()
    return(
        <div className='search-result' key={val._id} onClick={()=>history.push(`/user/${val.username}`)}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
        <img src={val.img !== '' ? `${url.serverUrl}/static/profile/${val.img}` : `https://avatars.dicebear.com/api/initials/${val.username}.svg`} alt='profile' style={{width: '42px', borderRadius: '50%'}}/>
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginLeft: '6px'}}>
        <Text fontSize='md' fontWeight='600'>{val.username}</Text>
        <div style={{marginLeft: '3px'}}>
        {val.verified && <Tooltip hasArrow label='weryfikacja'><VerifiedLogo/></Tooltip>}
        </div>
        </div>
        </div>
    )
}

export default SearchResult