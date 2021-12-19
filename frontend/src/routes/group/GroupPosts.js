import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Text } from "@chakra-ui/react"
import GroupPostAdd from "./GroupPostAdd"
import Post from "./Post"
import SectionGroupHashtags from "./SectionGroupHashtags"
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from "../../components/Loading"
import url from "../../components/urlSettings"

const GroupPosts = ({role}) => {
    let { id } = useParams()
    const [posts, setPosts] = useState([])
    const [isExist, setIsExist] = useState(true)
    const [page, setPage] = useState(2)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/group/${id}/posts?page=1`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data=>{
            setPosts(prev=>[...prev, ...data])
            setIsExist(true)
            setLoading(false)
        })
        .catch(err=>{
            setIsExist(false)
            setLoading(false)
        })
    },[id])

    if(loading) return <Loading/>

    if(!isExist) return(
    <section style={{width: '100%'}}>
    <GroupPostAdd id={id} role={role}/>
    <Text fontSize='sm'>Ta grupa jest prywatna albo jeszcze nie ma na niej postów</Text>
    </section>
    )

    const fetchPosts = async () =>{
    try{
        const res = await fetch(`${url.serverUrl}/api/group/${id}/posts?page=${page}`,{
            credentials: 'include'
        })
        const data = await res.json()
        setPosts(prev=>[...prev, ...data])
        if(data.length === 0 || data.length < 15){
            setHasMore(false)
        }
        setPage(prev=>prev+1)
    }catch(err){
        setHasMore(false)
    }
    }

    const result = posts.map(val=><Post key={val._id} value={val} role={role}/>)
    return(
        <section style={{width: '100%'}}>
            <SectionGroupHashtags id={id}/>
            <GroupPostAdd id={id} role={role}/>
            <InfiniteScroll
            dataLength={posts.length}
            next={fetchPosts}
            hasMore={hasMore}
            loader={<Loading/>}
            style={{overflow: 'hidden'}}>
            {result}
            </InfiniteScroll>
        </section>
    )
}

export default GroupPosts