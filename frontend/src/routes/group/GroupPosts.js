import { useState, useEffect } from "react"
import { useParams } from "react-router"
import GroupPostAdd from "./GroupPostAdd"
import Post from "./Post"
import SectionGroupHashtags from "./SectionGroupHashtags"
import Loading from "../../components/Loading"
import url from "../../components/urlSettings"

const GroupPosts = ({role}) => {
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
    <section style={{width: '100%'}}>
    <GroupPostAdd id={id}/>
    <span>Ta grupa jest prywatna albo jeszcze nie ma na niej postów</span>
    </section>
    )

    const result = posts.map(val=><Post key={val._id} value={val} role={role}/>)
    return(
        <section style={{width: '100%'}}>
            <GroupPostAdd id={id}/>
            <SectionGroupHashtags id={id}/>
            {result}
        </section>
    )
}

export default GroupPosts