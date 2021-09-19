import url from "../../components/urlSettings"

const JoinGroup = ({id}) => {

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

    return(
        <button onClick={handleClick}>Dołącz</button>
    )
}

export default JoinGroup