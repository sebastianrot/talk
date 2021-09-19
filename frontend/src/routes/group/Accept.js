import url from '../../components/urlSettings'

const Accept = ({id, user}) => {

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/${id}/user/${user}/accept`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return(
        <button onClick={handleClick}>Zaakceptuj</button>
    )
}

export default Accept