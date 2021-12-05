import { useState } from "react"
import { Textarea, Button } from "@chakra-ui/react"
import url from "../../components/urlSettings"

const Desc = () => {
    const [value, setValue] = useState('')

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/desc`, {
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
        <Textarea placeholder='Wprowadź opis' value={value} onChange={(e)=>setValue(e.target.value)} marginBottom='10px'/>
        <Button onClick={handleClick} size='sm'>Zapisz</Button>
        </>
    )
}

export default Desc