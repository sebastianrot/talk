import { useState, useEffect } from "react"
import Loading from "../../components/Loading"
import url from "../../components/urlSettings"

const ProfileGroups = ({id}) => {
    const [group, setGroup] = useState()
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(false)

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/user/${id}/groups`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data=>{
            setGroup(data)
             setErr(false)
            setLoading(false)
        }).catch(err=>{
            setErr(true)
            setLoading(false)
        })
    },[id])

    if(loading) return <Loading/>

    if(err) return <span>Nie jest na grupach</span>

    const result = group.map(val=><div key={val._id}>{val.group.name}</div>)

    return(
        <section>
            {result}
        </section>
    )
}

export default ProfileGroups