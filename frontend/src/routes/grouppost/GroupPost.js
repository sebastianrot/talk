import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Comments from "../../components/posts/Comments"
import AddComment from "../../components/posts/AddComment"
import Post from "../group/Post"
import Loading from "../../components/Loading"
import url from "../../components/urlSettings"

const GroupPost = ({role}) => {
    let { id } = useParams()
    let { postid } = useParams()
    const [post, setPost] = useState()
    const [isExist, setIsExist] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/group/${id}/post/${postid}`, {
            credentials: 'include'
        })
        .then(res =>res.json())
        .then(data => {
            setPost(data[0])
            setIsExist(true)
            setLoading(false)
        })
        .catch(err=>{
            setIsExist(false)
            setLoading(false)
        })
    },[id, postid])

    if(loading) return <Loading/>

    if(!isExist) return <span>Taki post nie istnieje</span>

    return(
        <section style={{width: '100%', marginBottom: '10px'}}>
            <Post key={post._id} value={post} role={role}/>
            <AddComment id={post._id} parent={'0'}/>
            <Comments id={post._id}/>
        </section>
    )
}

export default GroupPost