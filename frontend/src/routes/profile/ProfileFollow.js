import { useState, useEffect } from "react"
import Loading from "../../components/Loading"
import url from "../../components/urlSettings"

const ProfileFollow = ({id}) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/user/${id}/follow`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data=>{
            setUser(data)
            setLoading(false)
        }).catch(err=>{
            setLoading(false)
        })
    },[id])

    if(loading) return <Loading/>

    const result = user.map(val=><div key={val._id}>{val.user.username}</div>)

    return(
        <section>
            {result}
        </section>
    )
}

export default ProfileFollow