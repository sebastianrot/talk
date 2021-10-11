import { useState, useEffect } from "react"
import Comment from './Comment'
import Loading from "../Loading"
import url from "../urlSettings"

const Comments = ({id}) => {
    const [comments, setComments] = useState()
    const [isComment, setIsComment] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        fetch(`${url.serverUrl}/api/post/${id}/comments`, {
            credentials: 'include'
        })
        .then(res=>res.json())
        .then(data=>{
            setComments(data)
            setIsComment(true)
            setLoading(false)
        }).catch(err=> {
            setIsComment(false)
            setLoading(false)})
    }, [id])

    if(loading) return <Loading/>

    if(!isComment) return <span>Nie ma komentarzy</span>

    const result = comments.map(current=> <Comment key={current._id} value={current} id={id}/>)

    return(
    <section>
        {result}
    </section>
    )
}

export default Comments