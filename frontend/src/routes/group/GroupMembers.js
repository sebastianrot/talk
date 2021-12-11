import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import UserGroup from "./UserGroup"
import AdminAction from "./admin/AdminAction"
import ChangeRole from "./ChangeRole"
import Loading from "../../components/Loading"
import url from "../../components/urlSettings"

const GroupMembers = ({role}) => {
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

    const result = users.map(val=>(
    <div key={val._id}>
    <UserGroup val={val}/>
    {(role.admin || role.mod) && (
    <>
    <AdminAction id={val.group} user={val.user._id}/>
    <ChangeRole id={val.group} user={val.user._id}/>
    </>)}
    </div>))
    
    return(
        <main style={{width: '100%'}}>
            {result}
        </main>
    )
}

export default GroupMembers