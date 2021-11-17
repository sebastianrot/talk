import url from '../../../components/urlSettings'

const PostDeleteGroup = ({id, postid}) => {
    const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/${id}/post/${postid}/delete`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return(
        <button onClick={handleClick}>Usuń</button>
    )
}

export default PostDeleteGroup