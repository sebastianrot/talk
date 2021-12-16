import { useState, useEffect } from "react"
import TopComment from './TopComment'
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

    if(!isComment) return <span style={{padding: '5px 0px 0px 10px', fontSize: '14px'}}>Nie ma komentarzy</span>

    const result = comments.map(current=><TopComment key={current._id} value={current}/>)

    return(
    <section>
        {result}
    </section>
    )
}

export default Comments