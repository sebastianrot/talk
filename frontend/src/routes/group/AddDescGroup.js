import { useState } from "react"
import url from "../../components/urlSettings"

const AddDescGroup = ({id}) => {
    const [value, setValue] = useState('')

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/${id}/desc`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({desc: value})
        })
        setValue('')
    }

    return(
        <>
        <input type='text' placeholder='Wprowadź opis' value={value} onChange={(e)=>setValue(e.target.value)}/>
        <button onClick={handleClick}>Zapisz</button>
        </>
    )
}

export default AddDescGroup