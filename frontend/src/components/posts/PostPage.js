import './PostPage.css'
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Post from './Post'
import AddComment from './AddComment'
import Comments from './Comments'
import Loading from "../Loading"
import url from "../urlSettings"

const PostPage = () => {
    let { id } = useParams()
    const [post, setPost] = useState()
    const [isExist, setIsExist] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${url.serverUrl}/api/post/${id}`, {
            credentials: 'include'
        })
        .then(res =>res.json())
        .then(data => {
            setPost(data[0])
            setIsExist(true)
            setLoading(false)
        })
        .catch(err => {
            setIsExist(false)
            setLoading(false)})
    }, [id])

    if(loading) return <Loading/>

    if(!isExist) return <span>Taki post nie istnieje</span>

    return(
       <article className='post-page-article'>
            <Post value={post} key={post._id}/>
            <AddComment id={post._id} parent={'0'}/>
            <Comments id={post._id}/>
       </article>
    )
}

export default PostPage