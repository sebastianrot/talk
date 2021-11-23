import { useState, useEffect } from "react"
import Loading from "../../components/Loading"
import {Link} from 'react-router-dom'
import url from "../../components/urlSettings"

const SectionGroupHashtags = ({id}) => {
    const [hashtags, setHashtags] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(()=>{
        fetch(`${url.serverUrl}/api/group/${id}/hashtags`,{
            credentials: 'include'
        })
        .then(res=>res.json())
        .then(data=>{
            setHashtags(data)
            setError(false)
            setLoading(false)
        }).catch(err=>{
            setError(true)
            setLoading(false)
        })
    },[id])

    if(loading) return <Loading/>

    if(error) return <span>błąd</span>

    const result = hashtags.map(val=><div key={val._id}><Link to={`/group/${id}/search?q=%23${val._id.slice(1)}`}>{val._id}: {val.count}</Link></div>)
    return(
        <article>
            {result}
        </article>
    )
}

export default SectionGroupHashtags