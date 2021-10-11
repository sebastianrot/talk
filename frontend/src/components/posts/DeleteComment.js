import url from '../urlSettings'

const DeleteComment = ({id, post}) => {
    const handleClick = () => {
        fetch(`${url.serverUrl}/api/post/${post}/comment/${id}/delete`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include'
        })
    }
    return(
        <button onClick={handleClick}>Usuń</button>
    )
}

export default DeleteComment