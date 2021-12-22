import './GroupsResults.css'
import { useNavigate } from "react-router-dom"
import { Text, Tooltip } from "@chakra-ui/react"
import { ReactComponent as VerifiedLogo} from '../../components/svg/verified.svg'
import url from "../../components/urlSettings"

const GroupsResults = ({value, error}) => {
    let navigate = useNavigate()

    if(error) return <span>Nie ma grup z taką kategorią</span>

    const partText = (str) => {
        if (str.length > 40) {
            return (str.substring(0, 40) + "...");
        }
        else {
            return str;
        }
    }

    const result = value.map(val=><div className='groupsresults-div' key={val._id} onClick={()=>navigate(`/group/${val._id}`)}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
    <img src={`${url.serverUrl}/static/profilegroup/${val.img !== '' ? val.img : 'default.png'}`} alt='profile' style={{width: '42px', borderRadius: '50%'}}/>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px', justifyContent: 'center'}}>
    <div style={{display: 'flex', alignItems: 'center'}}>
    <Text fontSize='md' fontWeight='600'>{val.name}</Text>
    <div style={{marginLeft: '3px'}}>
    {val.verified && <Tooltip hasArrow label='weryfikacja'><VerifiedLogo/></Tooltip>}
    </div>
    </div>
    <Text fontSize='sm'>{partText(val.desc)}</Text>
    </div>
    </div>)
    return(
        <article className='groupsresults-article'>
            {result}
        </article>
    )
}

export default GroupsResults