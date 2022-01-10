import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import UserGroup from "./UserGroup"
import AdminAction from "./admin/AdminAction"
import ChangeRole from "./ChangeRole"
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from "../../components/Loading"
import url from "../../components/urlSettings"

const GroupMembers = ({role}) => {
    let { id } = useParams()
    const [users, setUsers] = useState()
    const [isExist, setIsExist] = useState(true)
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(2)
    const [hasMore, setHasMore] = useState(true)

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/group/${id}/members?page=1`,{
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data=>{
            setUsers(data)
            setIsExist(true)
            setLoading(false)})
        .catch(err=>{
            setIsExist(false)
            setLoading(false)})
    },[id])

    if(loading) return <Loading/>

    if(!isExist) return <span>Taka grupa nie istnieje</span>

    const fetchData = async () =>{
        try{
            const res = await fetch(`${url.serverUrl}/api/group/${id}/members?page=${page}`,{
                credentials: 'include'
            })
            const data = await res.json()
            setUsers(prev=>[...prev, ...data])
            if(data.length === 0 || data.length < 15){
                setHasMore(false)
            }
            setPage(prev=>prev+1)
        }catch(err){
            setHasMore(false)
        }
        }

    const result = users.map(val=>(
    <div key={val._id}>
    <UserGroup val={val}/>
    {(role.admin || role.mod) && (
    <div style={{display: 'flex'}}>
    <AdminAction id={val.group} user={val.user._id}/>
    <ChangeRole id={val.group} user={val.user._id}/>
    </div>)}
    </div>))
    
    return(
        <main style={{width: '100%'}}>
            <InfiniteScroll
            dataLength={users.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<Loading/>}
            style={{overflow: 'hidden'}}>
            {result}
            </InfiniteScroll>
        </main>
    )
}

export default GroupMembers