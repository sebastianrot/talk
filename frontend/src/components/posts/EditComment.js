import { useState } from 'react'
import url from '../urlSettings'

const EditComment = ({id, post, text}) => {
    const [value,setValue] = useState(text)
    const handleClick = () => {
        fetch(`${url.serverUrl}/api/post/${post}/comment/${id}/edit`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: value})
        })
    }
    return(
        <div>
        <input type='text' value={value} onChange={e=>setValue(e.target.value)}/>
        <button onClick={handleClick}>Zmień</button>
        </div>
    )
}

export default EditComment