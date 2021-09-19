import './Comment.css'

const Comment = ({value, user}) => {

    return(
        <article className='comment-article'>
            <span>{value.text}</span>
            <span>{user.username}</span>
        </article>
    )
}

export default Comment