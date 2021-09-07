import './PostPage.css'
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Post from './Post'
import Loading from "../Loading"
import { ReactComponent as VerifiedLogo} from '../../components/svg/verified.svg'
import url from "../urlSettings"

const PostPage = () => {
    let { id } = useParams()
    const [post, setPost] = useState()
    const [exist, setExist] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${url.serverUrl}/api/post/${id}`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setPost(data)
            setExist(true)
            setLoading(false)
        })
        .catch(err => {
            setExist(false)
            setLoading(false)
            return err})
    }, [id])

    if(!exist) return <span>Taki post nie istnieje</span>

    if(loading) return <Loading/>
    
    return(
       <article className='post-page-article'>
            <Post value={post} user={post}/>
       </article>
    )
}

export default PostPage