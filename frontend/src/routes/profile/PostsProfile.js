import {useState, useEffect, useContext} from 'react'
import Post from '../../components/posts/Post'
import AddPosts from './AddPosts'
import Loading from '../../components/Loading'
import AuthContext from '../../context/AuthContext'
import url from '../../components/urlSettings'

const PostsProfile = ({id}) => {
    const [post, setPost] = useState()
    const [status, setStatus] = useState()
    const [loading, setLoading] = useState(true)
    const {myUser} = useContext(AuthContext)

    useEffect(()=> {
        fetch(`${url.serverUrl}/api/user/${id}/posts`, {
            credentials: 'include'
        })
        .then(res=>{
            if(!res.ok) throw Error(res.status)
            return res.json()})
        .then(data=>{
            setPost(data)
            setLoading(false)})
            .catch(err=>{ 
                setStatus(err.message)
                setLoading(false)})
            
        }, [id])

    if(loading) return <Loading/>

    if(status === '404') return <span>Nie ma postów</span>

    if(status === '401') return <span>Konto jest prywatne</span>

 const posts = post.map((current)=><Post key={current._id} value={current}/>)

    return(
        <section className='posts-profile-section'>
           {myUser.id === id && <AddPosts/>}
            {posts}
        </section>
    )
}

export default PostsProfile