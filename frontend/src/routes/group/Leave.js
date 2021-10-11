import url from '../../components/urlSettings'

const Leave = ({id}) => {
    const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/${id}/leave`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }

    return(
        <button onClick={handleClick}>Wyjdź</button>
    ) 
}

export default Leave