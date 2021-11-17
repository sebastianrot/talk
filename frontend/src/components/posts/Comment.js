import './Comment.css'
import { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/AuthContext'
import AddComment from './AddComment'
import Reply from './Reply'
import Like from './Like'
import EditComment from './EditComment'
import DeleteComment from './DeleteComment'


const Comment = ({value, id}) => {
    const {myUser, isLoading} = useContext(AuthContext)
    const [show, setShow] = useState(false)
    const [reply, setReply] = useState(false)
    const [edit, setEdit] = useState(false)
    const [length, setLength] = useState(0)
    const replies = value.replies.map(el=><Reply key={el._id} value={el}/>)
    useEffect(()=>{
    value.replies.forEach(el => {
        setLength(prev=>prev+el.replies.length)
    })},[value])
    return(
        <article className='comment-article'>
            
            <DeleteComment id={value._id} post={id}/>
            <button onClick={()=>setEdit(!edit)}>Edytuj</button>
            {edit ? 
            <EditComment id={value._id} post={id} text={value.text}/> : <span>{value.text}</span>}
            <span>{value.by.username}</span>
            <Like id={value._id} option={'comment'} liked={value.liked} number={value.like}/>
            <button onClick={()=>setReply(!reply)}>odpowiedz</button>
            {reply && <AddComment id={id} parent={value._id}/>}
            <button onClick={()=>setShow(!show)}>{show ? `ukryj odpowiedzi` : `pokaż ${value.replies.length + length} odpowiedzi`}</button>
            {show && replies}
        </article>
    )
}

export default Comment