import { useState } from "react"
import { Switch, FormControl, FormLabel, Button } from "@chakra-ui/react"
import url from "../../components/urlSettings"

const AddPriv = ({id, value}) => {
    const [nsfw, setNsfw] = useState(value)

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/${id}/nsfw`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nsfw})
        })
    }
    return(
        <>
        <FormControl display='flex' alignItems='center'>
        <FormLabel htmlFor='priv' mb='0' fontWeight='600' marginBottom='10px'>
            Nsfw?
        </FormLabel>
        <Switch id='priv' isChecked={nsfw} onChange={(e)=>setNsfw(e.target.checked)}/>
        </FormControl>
        <Button onClick={handleClick} size='sm'>Zapisz</Button>
        </>
    )
}

export default AddPriv