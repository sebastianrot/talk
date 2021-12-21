import { useState, useEffect } from "react"
import { useParams, Navigate } from "react-router-dom"
import AdminUnblock from "./AdminUnblock"
import UserGroup from "../UserGroup"
import Loading from "../../../components/Loading"
import url from "../../../components/urlSettings"

const GroupBlock = () => {
    let { id } = useParams()
    const [block, setBlock] = useState()
    const [loading, setLoading] = useState(true)
    const [admin, setAdmin] = useState(false)

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/group/${id}/block`,{
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data=>{
            setBlock(data)
            setAdmin(true)
            setLoading(false)})
        .catch(err=>{
            setAdmin(false)
            setLoading(false)})
    },[id])

    if(loading) return <Loading/>

    if(!admin) return <Navigate to='/'/>

    const result = block.map(val=>(
    <div key={val._id}>
    <UserGroup val={val}/>
    <AdminUnblock id={val.group} user={val.user._id}/>
    </div>))

    return(
        <section style={{width: '100%'}}>
            {result}
        </section>
    )
}

export default GroupBlock