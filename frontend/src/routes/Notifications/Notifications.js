import './Notifications.css'
import { useState, useEffect } from "react"
import Notification from './Notification'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from "../../components/Loading"
import url from "../../components/urlSettings"

const Notifications = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(false)
    const [page, setPage] = useState(2)
    const [hasMore, setHasMore] = useState(true)

    useEffect(()=> {
        fetch(`${url.serverUrl}/api/notifications?page=1`,{
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
        if(val.ref === null || val.ref === undefined) return ''
        if(val.onModel==='Post') return `/p/${val.ref._id}`
        if(val.onModel==='User') return `/user/${val.ref.username}`
        if(val.onModel==='Group') return `/group/${val.ref._id}`
        if(val.onModel==='GroupPost') return `/group/${val.ref.group}/p/${val.ref._id}`
    }


    const fetchData = async () =>{
        try{
            const res = await fetch(`${url.serverUrl}/api/notifications?page=${page}`,{
                credentials: 'include'
            })
            const data = await res.json()
            setData(prev=>[...prev, ...data])
            if(data.length === 0 || data.length < 15){
                setHasMore(false)
            }
            setPage(prev=>prev+1)
        }catch(err){
            setHasMore(false)
        }
        }

    if(loading) return <Loading/>

    if(err) return(
    <section className="notifications-section">
    <span>Nie ma żadnych powiadomień</span>
    </section>
    )

    const result = data.map(val=><div key={val._id} style={val.read ? {width: '100%', padding: '10px'} : {background: '#f6f6f6', width: '100%', padding: '10px'}}><Notification val={val} type={type}/></div>)

    return(
        <section className="notifications-section">
            <div style={{width: '100%'}}>
            <InfiniteScroll
            dataLength={data.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<Loading/>}
            style={{overflow: 'hidden'}}>
            {result}
            </InfiniteScroll>
            </div>
        </section>
    )
}

export default Notifications