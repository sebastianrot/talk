import {useState, useEffect} from 'react'
import {useParams,Link, Route, useRouteMatch, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import JoinGroup from './JoinGroup'
import ShareGroup from './ShareGroup'
import GroupMembers from './GroupMembers'
import GroupPosts from './GroupPosts'
import Leave from './Leave'
import Loading from '../../components/Loading'
import url from '../../components/urlSettings'
import AddPhoto from './AddPhoto'
import AddBanner from './AddBanner'
import AddDescGroup from './AddDescGroup'

const Group = () => {
    let { id } = useParams()
    const [group, setGroup] = useState()
    const [isExist, setIsExist] = useState(true)
    const [loading, setLoading] = useState(true)
    const {path} = useRouteMatch()

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/group/${id}`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data=>{
            setGroup(data)
            setIsExist(true)
            setLoading(false)
        }).catch(err=>{
            setIsExist(false)
            setLoading(false)})
    },[id])

    if(loading) return <Loading/>

    if(!isExist) return <span>Taka grupa nie istnieje</span>

    return(
        <Router>
        <main>
        <section>
            <span>{group.name}</span>
            <span>{group.category}</span>
            <span>{group.priv}</span>
            <span>{group.desc}</span>
            <span>{`${group.users} członków grupy`}</span>
            <img src={`${url.serverUrl}/static/bannergroup/${group.banner}`} alt='banner grupy' style={{width: '400px', objectFit: 'cover'}}/>
            <img src={`${url.serverUrl}/static/profilegroup/${group.img}`} alt='zdjęcie grupy' style={{width: '150px', borderRadius: '50%', objectFit: 'cover'}}/>
            {group.status === 'accept' ? <ShareGroup id={group._id}/> : <JoinGroup id={group._id} status={group.status}/>}
            {group.status === 'accept' && <Leave id={group._id}/>}
            <Link to={`/group/${group._id}/posts`}>posts</Link>
            <Link to={`/group/${group._id}/members`}>members</Link>
            {group.role === 'admin' && <AddPhoto id={group._id}/>}
            {group.role === 'admin' && <AddBanner id={group._id}/>}
            {group.role === 'admin' && <AddDescGroup id={group._id}/>}
            {group.role === 'admin' && <Link to={`/group/${group._id}/accept`}>Zaakceptuj</Link>}
            </section>
            <Switch>
            <Route path={[`${path}/`, `${path}/posts`]} exact >
                <GroupPosts/>
            </Route>
            <Route path={`${path}/members`} component={GroupMembers}/>
            <Route render={() => <Redirect to='/'/>} />
            </Switch>
        </main>
        </Router>
    )
}

export default Group