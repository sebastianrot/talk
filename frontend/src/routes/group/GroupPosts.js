import { useState, useEffect } from "react"
import { useParams } from "react-router"
import GroupPostAdd from "./GroupPostAdd"
import Post from "./Post"
import Loading from "../../components/Loading"
import url from "../../components/urlSettings"

const GroupPosts = () => {
    let { id } = useParams()
    const [posts, setPosts] = useState()
    const [isExist, setIsExist] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/group/${id}/posts`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data=>{
            setPosts(data)
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
    <>
    <GroupPostAdd id={id}/>
    <span>Tu nie ma postów</span>
    </>
    )

    const result = posts.map(val=><Post key={val._id} value={val}/>)
    return(
        <section>
            <GroupPostAdd id={id}/>
            {result}
        </section>
    )
}

export default GroupPosts