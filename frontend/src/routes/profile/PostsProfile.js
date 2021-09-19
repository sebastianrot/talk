import {useState, useEffect} from 'react'
import Post from '../../components/posts/Post'
import Loading from '../../components/Loading'
import url from '../../components/urlSettings'

const PostsProfile = ({id}) => {
    const [post, setPost] = useState()
    const [user, setUser] = useState()
    const [isPosts, setIsPosts] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        fetch(`${url.serverUrl}/api/user/${id}/posts`, {
            credentials: 'include'
        })
        .then(res=> res.json())
        .then(data=>{
            setPost(data.post)
            setUser(data.user)
            setIsPosts(true)
            setLoading(false)})
            .catch(err=>{ 
                setIsPosts(false)
                setLoading(false)})
            
        }, [id])

    if(loading) return <Loading/>

    if(!isPosts) return <span>Nie ma postów</span>
console.log(user)
    if(user.priv && !user.followed) return <span>Konto jest prywatne</span>

 const posts = post.map((current)=><Post key={current._id} value={current} user={user}/>)

    return(
        <section className='posts-profile-section'>
            {posts}
        </section>
    )
}

export default PostsProfile