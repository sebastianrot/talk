import {useState, useEffect} from 'react'
import { useLocation, useParams } from "react-router-dom"
import Post from './Post'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../../components/Loading'
import url from '../../components/urlSettings'

const GroupHashtags = ({role}) => {
    let { id } = useParams()
    const location = useLocation()
    const [hashtag, setHashtags] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [page, setPage] = useState(2)
    const [hasMore, setHasMore] = useState(true)

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/group/${id}/search${location.search}&page=1`,{
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

    if(error) return <span>nie ma takich hashtagów</span>

    const fetchData = async () =>{
        try{
            const res = await fetch(`${url.serverUrl}/api/group/${id}/search${location.search}&page=${page}`,{
                credentials: 'include'
            })
            const data = await res.json()
            setHashtags(prev=>[...prev, ...data])
            if(data.length === 0 || data.length < 15){
                setHasMore(false)
            }
            setPage(prev=>prev+1)
        }catch(err){
            setHasMore(false)
        }
        }

    const results = hashtag.map(val=><Post key={val._id} value={val} role={role}/>)

    return(
     <main style={{width: '100%'}}>
            <InfiniteScroll
            dataLength={hashtag.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<Loading/>}
            style={{overflow: 'hidden'}}>
            {results}
            </InfiniteScroll>
     </main>
    )
}

export default GroupHashtags