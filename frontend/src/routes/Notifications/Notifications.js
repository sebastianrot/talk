import './Notifications.css'
import { useState, useEffect } from "react"
import Notification from './Notification'
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
        if(val.onModel==='Post') return `/p/${val.ref._id}`
        if(val.onModel==='User') return `/user/${val.ref.username}`
        if(val.onModel==='Group') return `/group/${val.ref._id}`
        if(val.onModel==='GroupPost') return `/group/${val.ref.group}/p/${val.ref._id}`
    }

    if(loading) return <Loading/>

    if(err) return <span>Nie ma żadnych powiadomień</span>

    const result = data.map(val=><div key={val._id} style={val.read ? {width: '100%', padding: '10px'} : {background: '#f6f6f6', width: '100%', padding: '10px'}}><Notification val={val} type={type}/></div>)

    return(
        <section className="notifications-section">
           {result}
        </section>
    )
}

export default Notifications