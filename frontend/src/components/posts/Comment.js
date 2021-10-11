import './Comment.css'
import { useState, useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import AddComment from './AddComment'
import Reply from './Reply'
import LikeComment from './LikeComment'
import EditComment from './EditComment'
import DeleteComment from './DeleteComment'


const Comment = ({value, id}) => {
    const {myUser, isLoading} = useContext(AuthContext)
    const [show, setShow] = useState(false)
    const [reply, setReply] = useState(false)
    const [edit, setEdit] = useState(false)
    const replies = value.replies.map(el=><Reply key={el._id} value={el}/>)
    return(
        <article className='comment-article'>
            {myUser.id === value.by._id && <>
            <DeleteComment id={value._id} post={id}/>
            <button onClick={()=>setEdit(!edit)}>Edytuj</button>
            {edit ? 
            <EditComment id={value._id} post={id} text={value.text}/> : <span>{value.text}</span>}</>}
            <span>{value.by.username}</span>
            <LikeComment id={value._id} liked={false} amount={value.like.length}/>
            <button onClick={()=>setReply(!reply)}>odpowiedz</button>
            {reply && <AddComment id={id} parent={value._id}/>}
            <button onClick={()=>setShow(!show)}>{show ? `ukryj odpowiedzi` : `pokaż ${value.replies.length} odpowiedzi`}</button>
            {show && replies}
        </article>
    )
}

export default Comment