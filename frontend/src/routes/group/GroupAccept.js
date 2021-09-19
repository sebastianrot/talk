import {useState, useEffect} from 'react'
import {useParams, Redirect} from 'react-router-dom'
import Accept from './Accept'
import Reject from './Reject'
import Block from './Block'
import Loading from '../../components/Loading'
import url from '../../components/urlSettings'

const GroupAccept = () => {

    let { id } = useParams()
    const [accept, setAccept] = useState()
    const [admin, setAdmin] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        fetch(`${url.serverUrl}/api/group/${id}/accept`,{
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data=>{
            setAccept(data)
            setAdmin(true)
            setLoading(false)
        }).catch(err=>{
            setAdmin(false)
            setLoading(false)})
    },[id])

    if(loading) return <Loading/>

    if(!admin) return <Redirect to='/'/>

    const result = accept.map(current=><div key={current._id}>{current.user.username}<Accept id={current.group} user={current.user._id}/><Reject id={current.group} user={current.user._id}/><Block id={current.group} user={current.user._id}/></div>)

    return(
        <section>
            {result}
        </section>
    )
}

export default GroupAccept