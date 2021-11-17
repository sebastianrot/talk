import url from "../urlSettings"

const PostDelete = ({id}) => {
    const handleClick = () => {
        fetch(`${url.serverUrl}/api/post/${id}/delete`,{
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

export default PostDelete 