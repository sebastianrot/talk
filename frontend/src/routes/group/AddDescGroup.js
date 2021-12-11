import { useState } from "react"
import { Textarea, Button } from "@chakra-ui/react"
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
        <Textarea placeholder='Wprowadź opis' value={value} onChange={(e)=>setValue(e.target.value)}/>
        <Button marginTop='10px' size='sm' onClick={handleClick}>Zapisz</Button>
        </>
    )
}

export default AddDescGroup