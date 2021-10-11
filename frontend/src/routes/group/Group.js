import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import JoinGroup from './JoinGroup'
import ShareGroup from './ShareGroup'
import Leave from './Leave'
import Loading from '../../components/Loading'
import url from '../../components/urlSettings'

const Group = () => {
    let { id } = useParams()
    const [group, setGroup] = useState()
    const [isExist, setIsExist] = useState(true)
    const [loading, setLoading] = useState(true)

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
        <section>
            <span>{group.name}</span>
            <span>{group.category}</span>
            <span>{group.priv}</span>
            {group.status === 'accept' ? <ShareGroup id={group._id}/> : <JoinGroup id={group._id} status={group.status}/>}
            {group.status === 'accept' && <Leave id={group._id}/>}
        </section>
    )
}

export default Group