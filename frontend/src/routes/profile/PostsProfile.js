import {useState, useEffect, useContext} from 'react'
import { Text } from '@chakra-ui/react'
import Post from '../../components/posts/Post'
import AddPosts from './AddPosts'
import Loading from '../../components/Loading'
import AuthContext from '../../context/AuthContext'
import InfiniteScroll from 'react-infinite-scroll-component'
import url from '../../components/urlSettings'

const PostsProfile = ({id}) => {
    const [posts, setPosts] = useState([])
    const [status, setStatus] = useState()
    const [page, setPage] = useState(2)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(true)
    const {myUser} = useContext(AuthContext)

    useEffect(()=> {
        fetch(`${url.serverUrl}/api/user/${id}/posts?page=1`, {
            credentials: 'include'
        })
        .then(res=>{
            if(!res.ok) throw Error(res.status)
            return res.json()})
        .then(data=>{
            setPosts(prev=>[...prev, ...data])
            setLoading(false)})
            .catch(err=>{ 
                setStatus(err.message)
                setLoading(false)})
            
        }, [id])

    if(loading) return <Loading/>

    if(status === '404') return <Text fontSize='sm'>Nie ma postów</Text>

    if(status === '401') return <Text fontSize='sm'>Konto jest prywatne</Text>

    const fetchPosts = async () =>{
    try{
        const res = await fetch(`${url.serverUrl}/api/user/${id}/posts?page=${page}`,{
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

 const result = posts.map((current)=><Post key={current._id} value={current}/>)

    return(
        <section className='posts-profile-section'>
           {myUser.id === id && <AddPosts/>}
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

export default PostsProfile