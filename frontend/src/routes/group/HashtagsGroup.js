import { useState, useEffect } from "react"
import Loading from "../../components/Loading"
import url from "../../components/urlSettings"

const HashtagsGroup = ({id}) => {
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

    const result = hashtags.map(val=><div key={val._id}>{val._id}: {val.count}</div>)
    return(
        <article>
            {result}
        </article>
    )
}

export default HashtagsGroup