import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'
import Date from '../../components/posts/Date'
import Loading from "../../components/Loading"
import url from "../../components/urlSettings"

const Notifications = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(false)

    useEffect(()=> {
        fetch(`${url.serverUrl}/api/notifications`,{
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data=>{
            setData(data)
            setErr(false)
            setLoading(false)
        }).catch(err=>{
            setErr(true)
            setLoading(false)
        })
    },[])


    useEffect(()=>{
        fetch(`${url.serverUrl}/api/notifications/read`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },[])

    const type = (val) => {
        if(val.type==='post') return `/p/${val.ref}`
        if(val.type==='user') return `/user/${val.sender.username}`
        return `/${val.type}/${val.ref}`
    }

    if(loading) return <Loading/>

    if(err) return <span>Nie ma żadnych powiadomień</span>

    const result = data.map(val=><div key={val._id}><Link to={type(val)}>{val.message}-{val.sender.username} {val.read ? 'przeczytane' : 'nieodczytane'} <Date value={val.date}/></Link></div>)

    return(
        <main>
           {result}
        </main>
    )
}

export default Notifications