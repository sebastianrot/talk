import './ProfileGroups.css'
import { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { Text, Tooltip } from "@chakra-ui/react"
import Loading from "../../components/Loading"
import { ReactComponent as VerifiedLogo} from '../../components/svg/verified.svg'
import url from "../../components/urlSettings"

const ProfileGroups = ({id}) => {
    const [group, setGroup] = useState()
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(false)
    let history = useHistory()

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/user/${id}/groups`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data=>{
            setGroup(data)
             setErr(false)
            setLoading(false)
        }).catch(err=>{
            setErr(true)
            setLoading(false)
        })
    },[id])

    if(loading) return <Loading/>

    if(err) return <span>Nie jest na grupach</span>

    const partText = (str) => {
        if (str.length > 30) {
            return (str.substring(0, 30) + "...");
        }
        else {
            return str;
        }
    }

    const result = group.map(val=><div className='usergroup-div' key={val._id} onClick={()=>history.push(`/group/${val.group._id}`)}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
    <img src={val.group.img !== '' ? `${url.serverUrl}/static/profilegroup/${val.group.img}` : `https://avatars.dicebear.com/api/initials/${val.group.name}.svg`} alt='profile' style={{width: '42px', borderRadius: '50%'}}/>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px', justifyContent: 'center'}}>
    <div style={{display: 'flex', alignItems: 'center'}}>
    <Text fontSize='md' fontWeight='600'>{val.group.name}</Text>
    <div style={{marginLeft: '3px'}}>
    {val.group.verified && <Tooltip hasArrow label='weryfikacja'><VerifiedLogo/></Tooltip>}
    </div>
    </div>
    <Text fontSize='sm'>{partText(val.group.desc)}</Text>
    </div>
    </div>)

    return(
        <section className='usergroup-section'>
            {result}
        </section>
    )
}

export default ProfileGroups