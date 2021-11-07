import url from '../../../components/urlSettings'

const Block = ({id, user}) => {

 const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/${id}/user/${user}/block`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return(
        <button onClick={handleClick}>Zablokuj</button>
    )
}

export default Block