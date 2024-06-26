import './UserGroup.css'
import { Tooltip, Text, Tag } from "@chakra-ui/react"
import { useNavigate } from "react-router";
import { ReactComponent as VerifiedLogo} from '../../components/svg/verified.svg'
import url from "../../components/urlSettings";

const UserGroup = ({val}) => {
    let navigate = useNavigate()

    const partText = (str) => {
        if (str.length > 40) {
            return (str.substring(0, 40) + "...");
        }
        else {
            return str;
        }
    }

    return(
    <section className='groupusers-section'>
    <div className='groupusers-div' key={val.user._id} onClick={()=>navigate(`/user/${val.user.username}`)}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
    <img src={`${url.serverUrl}/static/profile/${val.user.img !== '' ? val.user.img : 'default.jpg'}`} alt='profile' style={{width: '42px', borderRadius: '50%'}} />
    </div>
    <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px', justifyContent: 'center'}}>
    <div style={{display: 'flex', alignItems: 'center'}}>
    <Text fontSize='md' fontWeight='600'>{val.user.username}</Text>
    <div style={{marginLeft: '3px'}}>
    {val.user.verified && <Tooltip hasArrow label='weryfikacja'><VerifiedLogo/></Tooltip>}
    </div>
    <div style={{marginLeft: '3px', display: 'flex', alignItems: 'center'}}>
    <Tag colorScheme='blue' size='sm'>{val.role}</Tag>
    </div>
    </div>
    <Text fontSize='sm'>{partText(val.user.desc)}</Text>
    </div>
    </div>
    </section>
    )
}

export default UserGroup