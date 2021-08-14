import { useState } from "react"
import url from "../../components/urlSettings"

const AddPosts = () => {

    const [value, setValue] = useState('')

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/posts`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({post: value})
        })
        setValue('')
    }

    return(
        <div>
        <input type='text' placeholder='Co słychać?' onChange={(e)=> setValue(e.target.value)} value={value}/>
        <button onClick={handleClick}>Opublikuj</button>
        </div>
    )
}

export default AddPosts