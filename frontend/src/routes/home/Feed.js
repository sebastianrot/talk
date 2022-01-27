import './Feed.css'
import { useState, useEffect } from "react"
import PostFeed from "./PostFeed"
import Post from "../../components/posts/Post"
import Home from './Home'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from "../../components/Loading"
import url from "../../components/urlSettings"

const Feed = () => {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(2)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/feed?page=1`,{
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data=>{
            setPosts(prev=>[...prev, ...data])
            setLoading(false)
        }).catch(err=>{
            setLoading(false)
        })
    },[])

    if(loading) return <Loading/>

    if(posts.length === 0) return <section className='feed-section'><Home/><span style={{fontWeight:600, margin: 'auto', marginTop: '15px'}}>Dołącz do grup żeby była tu zawartość</span></section>


    const fetchPosts = async () =>{
        const res = await fetch(`${url.serverUrl}/api/feed?page=${page}`,{
            credentials: 'include'
        })
        const data = await res.json()
        setPosts(prev=>[...prev, ...data])
        if(data.length === 0 || data.length < 15){
            setHasMore(false)
        }
        setPage(prev=>prev+1)
    }
    const result = posts.map(val=>val.onModel==='Post' ? <Post key={Math.floor(100000000 + Math.random() * 900000000)} value={val.post}/> : <PostFeed key={Math.floor(100000000 + Math.random() * 900000000)} value={val.post} group={val.group}/>)

    return(
        <section className='feed-section'>
            <Home/>
            <div style={{width: '100%'}}>
            <InfiniteScroll
            dataLength={posts.length}
            next={fetchPosts}
            hasMore={hasMore}
            loader={<Loading/>}
            style={{overflow: 'hidden'}}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                <b>Yay! Widzałeś już wszystko</b>
                </p>
            }>
             {result}
            </InfiniteScroll>
            </div>
        </section>
    )
}

export default Feed