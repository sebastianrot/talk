import url from '../../components/urlSettings'

const Reject = ({id, user}) => {

 const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/${id}/user/${user}/reject`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return(
        <button onClick={handleClick}>Odrzuć</button>
    )
}

export default Reject