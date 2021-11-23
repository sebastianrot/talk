import {useState, useEffect} from 'react'
import { useLocation, useParams } from "react-router-dom"
import Post from './Post'
import Loading from '../../components/Loading'
import url from '../../components/urlSettings'

const GroupHashtags = () => {
    let { id } = useParams()
    const location = useLocation()
    const [hashtag, setHashtags] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(()=>{
        fetch(`${url.serverUrl}/api/group/${id}/search${location.search}`,{
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data=>{
            setHashtags(data)
            setError(false)
            setLoading(false)
        })  
        .catch(err=>{
            setError(true)
            setLoading(false)
        })
    },[id, location])

    if(loading) return <Loading/>

    if(error) return <span>nie ma takich wyników</span>

    const results = hashtag.map(val=><Post key={val._id} value={val}/>)

    return(
     <main>
         {results}
     </main>
    )
}

export default GroupHashtags