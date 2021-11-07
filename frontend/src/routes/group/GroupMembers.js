import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import AdminAction from "./admin/AdminAction"
import Loading from "../../components/Loading"
import url from "../../components/urlSettings"

const GroupMembers = () => {
    let { id } = useParams()
    const [users, setUsers] = useState()
    const [isExist, setIsExist] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/group/${id}/members`,{
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

    const result = users.map(val=><div key={val._id}><span>{val.user.username}</span><span>{val.role}</span><AdminAction id={val.group} user={val.user._id}/></div>)
    return(
        <main>
            {result}
        </main>
    )
}

export default GroupMembers