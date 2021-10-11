import './JoinGroup.css'
import url from "../../components/urlSettings"

const JoinGroup = ({id, status}) => {

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/${id}/join`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }

    const text = (accept) => {
        if(accept === 'pending') return 'Oczekiwanie'
        if(accept=== 'reject') return 'Dołącz'
        if(accept === 'block') return 'Zablokowany'
    }

    return(
        <button onClick={handleClick} className={`btn-join-status ${status}`}>{text(status)}</button>
    )
}

export default JoinGroup