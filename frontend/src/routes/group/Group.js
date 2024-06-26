import './Group.css'
import {useState, useEffect} from 'react'
import {useParams, Route, Routes, useNavigate, useLocation} from 'react-router-dom'
import { Tabs, TabList, Tab, Text, Tooltip, Badge } from '@chakra-ui/react'
import { FaLock } from 'react-icons/fa'
import JoinGroup from './JoinGroup'
import GroupPost from '../grouppost/GroupPost'
import GroupMembers from './GroupMembers'
import GroupPosts from './GroupPosts'
import Loading from '../../components/Loading'
import GroupHashtags from './GroupHashtags'
import GroupAccept from './admin/GroupAccept'
import GroupBlock from './admin/GroupBlock'
import Linkify from 'linkify-react'
import 'linkify-plugin-mention';
import {ReactComponent as VerifiedLogo} from '../../components/svg/verified.svg'
import urlSettings from '../../components/urlSettings'

const Group = () => {
    let { id } = useParams()
    const [group, setGroup] = useState()
    const [isExist, setIsExist] = useState(true)
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState({admin: false, mod: false})
    let location = useLocation()
    let navigate = useNavigate()

    useEffect(()=>{
        fetch(`${urlSettings.serverUrl}/api/group/${id}`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data=>{
            setGroup(data)
            setIsExist(true)
            setRole(prev=>({
            ...prev,
            admin:data.role === 'admin',
            mod: data.role==='mod'}))
            setLoading(false)
        }).catch(err=>{
            setIsExist(false)
            setRole(prev=>({
                ...prev,
                admin: false,
                mod: false
            }))
            setLoading(false)})
    },[id])

    if(loading) return <Loading/>

    if(!isExist) return <span>Taka grupa nie istnieje</span>

    const tabs = () =>{
        if(location.pathname === `/group/${group._id}/`) return 0
        if(location.pathname === `/group/${group._id}/posts`) return 0
        if(location.pathname === `/group/${group._id}/search`) return 0
        if(location.pathname === `/group/${group._id}/members`) return 1
        if(location.pathname === `/group/${group._id}/accept`) return 2
        if(location.pathname === `/group/${group._id}/block`) return 3
    }

    const options = {
        className: 'new-link',
        formatHref: {
            mention: (href) => '/user' + href
          }
      }

    const date = new Date(group.date)
    return(
        <main className='group-main'>
        <section className='profile-section'>
        <img src={`${urlSettings.serverUrl}/static/bannergroup/${group.banner !== '' ? group.banner : 'default.jpg'}`} alt='banner' style={{width: '100%',objectFit: 'cover'}}/>
        <div className='profile-info'>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
        <img src={`${urlSettings.serverUrl}/static/profilegroup/${group.img !== '' ? group.img : 'default.png'}`} alt='zdjęcie profilowe' className='img-user'/>
        <JoinGroup key={group._id} group={group} role={role}/>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{marginRight: '3px'}}>
        {group.priv && <FaLock fontSize='14px'/>}
        </div>
        <Text fontSize='lg' fontWeight='600'>{group.name}</Text>
        <div style={{marginLeft: '3px'}}>
        {group.verified && <Tooltip hasArrow label='weryfikacja'><VerifiedLogo/></Tooltip>}
        </div>
        </div>
        {group.nsfw && <div style={{marginTop: '1px'}}><Badge variant='outline' colorScheme='red' fontSize='12px'>nsfw</Badge></div>}
        <span style={{marginBottom: '4px'}}>kategoria {group.category}</span>
        <span style={{marginBottom: '4px'}}><Linkify options={options}>{group.desc}</Linkify></span>
        <span style={{marginBottom: '4px'}}>Utworzono w {date.getFullYear()}</span>
        <div style={{display: 'flex'}}>
        <div style={{marginBottom: '7px', display: 'flex'}}>
        <div style={{marginRight: '10px'}}>
        <span style={{fontWeight: '700', marginRight: '4px'}}>{group.users}</span>
        <span>Członków grupy</span>
        </div>
        </div>
        </div>
        </div>
        </section>
        <Tabs width='100%' isFitted index={tabs()} marginBottom='15px' style={{overflowY:'hidden', scrollbarWidth:'none'}}>
        <TabList>
            <Tab onClick={()=>navigate(`/group/${group._id}/posts`)}>Posty</Tab>
            <Tab onClick={()=>navigate(`/group/${group._id}/members`)}>Użytkownicy</Tab>
            {(role.admin || role.mod) && <Tab onClick={()=>navigate(`/group/${group._id}/accept`)}>Prośby</Tab>}
            {(role.admin || role.mod) && <Tab onClick={()=>navigate(`/group/${group._id}/block`)}>Zablokowani</Tab>}
        </TabList>
        </Tabs>

            <Routes>
            <Route path={`/`} element={<GroupPosts role={role} status={group.status}/>}/>
            <Route path={`/posts`} element={<GroupPosts role={role} status={group.status}/>}/>
            <Route path={`/members`} element={<GroupMembers role={role}/>}/>
            <Route path='/p/:postid' element={<GroupPost role={role}/>}/>
            <Route path='/search' element={<GroupHashtags role={role}/>}/>
            {(role.admin || role.mod) && <Route path={`/accept`} element={<GroupAccept/>}/>}
            {(role.admin || role.mod) && <Route path={`/block`} element={<GroupBlock/>}/>}
            <Route path='*' element={<span>404</span>} />
            </Routes>
        </main>
    )
}

export default Group