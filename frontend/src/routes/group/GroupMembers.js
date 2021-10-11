import { useState, useEffect } from "react"
import { useParams } from "react-router"
import Loading from "../../components/Loading"
import url from "../../components/urlSettings"

const GroupMembers = () => {
    let { id } = useParams()
    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/group/${id}/members`,{
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data=>{
            setUsers(data)
            setLoading(false)})
        .catch(err=> setLoading(false))
    },[id])

    if(loading) return <Loading/>

    const result = users.map(val=><div key={val._id}><span>{val.user.username}</span><span>{val.role}</span></div>)
    return(
        <main>
            {result}
        </main>
    )
}

export default GroupMembers