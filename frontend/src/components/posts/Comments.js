import { useState, useEffect } from "react"
import Comment from './Comment'
import Loading from "../Loading"
import url from "../urlSettings"

const Comments = ({id}) => {
    const [comments, setComments] = useState()
    const [user, setUser] = useState()
    const [isComment, setIsComment] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        fetch(`${url.serverUrl}/api/post/${id}/comments`, {
            credentials: 'include'
        })
        .then(res=>res.json())
        .then(data=>{
            setComments(data.comment)
            setUser(data.user)
            setIsComment(true)
            setLoading(false)
        }).catch(err=> {
            setIsComment(false)
            setLoading(false)})
    }, [id])

    if(loading) return <Loading/>

    if(!isComment) return <span>Nie ma postów</span>

    const result = comments.map((current, i)=> <Comment key={current.id} value={current} user={user[i]}/>)

    return(
    <section>
        {result}
    </section>
    )
}

export default Comments