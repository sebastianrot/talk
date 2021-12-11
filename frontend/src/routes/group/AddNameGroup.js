import { useState } from "react"
import { Input, Button } from "@chakra-ui/react"
import url from "../../components/urlSettings"

const AddNameGroup = ({id}) => {
    const [value, setValue] = useState('')

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/${id}/name`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: value})
        })
        setValue('')
    }

    return(
        <>
        <Input placeholder='Wprowadź opis' value={value} onChange={(e)=>setValue(e.target.value)}/>
        <Button marginTop='10px' size='sm' onClick={handleClick}>Zapisz</Button>
        </>
    )
}

export default AddNameGroup