import './Profile.css'
import {useState, useEffect, useContext} from 'react'
import {useParams,useHistory, Route, useRouteMatch, BrowserRouter as Router, Switch, useLocation, Link} from 'react-router-dom'
import { Tabs, TabList, Tab, Text, Tooltip } from '@chakra-ui/react'
import urlSettings from '../../components/urlSettings'
import AuthContext from '../../context/AuthContext'
import EditProfile from './EditProfile'
import PostsProfile from './PostsProfile'
import ProfileGroups from './ProfileGroups'
import ProfileFollow from './ProfileFollow'
import ProfileNotExist from './ProfileNotExist'
import Loading from '../../components/Loading'
import Follow from './Follow'
import { ReactComponent as VerifiedLogo} from '../../components/svg/verified.svg'

const Profile = () => {

    let { username } = useParams()
    let location = useLocation()
    let history = useHistory()
    const {myUser, logged, isLoading} = useContext(AuthContext)
    const [isExist, setIsExist] = useState(true)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const {path, url} = useRouteMatch()

    useEffect(() => {
        fetch(`${urlSettings.serverUrl}/api/user/${username}`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setUser(data)
            setIsExist(true)
            setLoading(false)
        })
        .catch(err => {
            setIsExist(false)
            setLoading(false)})
    }, [username])

 
    if(loading || isLoading) return <Loading/>

    if(!isExist) return <ProfileNotExist/>
 

    const tabs = () =>{
        if(location.pathname === `${url}/`) return 0
        if(location.pathname === `${url}/posts`) return 0
        if(location.pathname === `${url}/groups`) return 1
        if(location.pathname === `${url}/follow`) return 2
    }

    const date = new Date(user.date)
    return(
        <Router>
        <main className='profile-main'>
        <section className='profile-section'>
        <img src={`${urlSettings.serverUrl}/static/banner/${user.banner!== '' ? user.banner : 'default.jpg'}`} alt='banner' style={{width: '100%',objectFit: 'cover'}}/>
        <div className='profile-info'>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
        <img src={user.img !== '' ? `${urlSettings.serverUrl}/static/profile/${user.img}` : `https://avatars.dicebear.com/api/initials/${user.username}.svg`} alt='zdjęcie profilowe' className='img-user'/>
        {logged && myUser.id === user._id ? <EditProfile img={user.img} banner={user.banner} hobby={user.category}/> : <Follow id={user._id} followed={user.followed} key={user._id}/>}
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
        <Text fontSize='lg' fontWeight='600'>{user.username}</Text>
        <div style={{marginLeft: '3px'}}>
        {user.verified && <Tooltip hasArrow label='weryfikacja'><VerifiedLogo/></Tooltip>}
        </div>
        </div>
        <span style={{marginBottom: '4px'}}>{user.desc}</span>
        <span style={{marginBottom: '4px'}}>Dołączył/a {date.getFullYear()}</span>
        <div style={{display: 'flex'}}>
        <div style={{marginBottom: '7px', display: 'flex'}}>
        <div style={{marginRight: '10px'}}>
        <span style={{fontWeight: '700', marginRight: '4px'}}>{user.followers}</span>
        <span>Obserwujących</span>
        </div>
        <div>
        <span style={{fontWeight: '700', marginRight: '4px'}}>{user.follow}</span>
        <span>Obserwuje</span>
        </div>
        </div>
        </div>
        </div>
        </section>
        <Tabs width='100%' isFitted index={tabs()} marginBottom='15px'>
        <TabList>
            <Tab onClick={()=>history.push(`/user/${user.username}/posts`)}>Posty</Tab>
            <Tab onClick={()=>history.push(`/user/${user.username}/groups`)}>Grupy</Tab>
            <Tab onClick={()=>history.push(`/user/${user.username}/follow`)}>Obserwuje</Tab>
        </TabList>
        </Tabs>

        <Switch>
            <Route path={[`${path}/`, `${path}/posts`]} exact>
                <PostsProfile key={user._id} id={user._id}/>
            </Route>
            <Route path={`${path}/groups`}>
                <ProfileGroups id={user._id}/>
            </Route>
            <Route path={`${path}/follow`}>
                <ProfileFollow id={user._id}/>
            </Route>
            <Route render={() => <span>404</span>} />
        </Switch>
        </main>
        </Router>
    )
}

export default Profile