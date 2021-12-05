import { useState } from "react"
import { Switch, FormControl, FormLabel, Button } from "@chakra-ui/react"
import url from "../../components/urlSettings"

const AddPriv = () => {
    const [priv, setPriv] = useState(false)

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/priv`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({priv})
        })
    }
    return(
        <>
        <FormControl display='flex' alignItems='center'>
        <FormLabel htmlFor='priv' mb='0' fontWeight='600' marginBottom='10px'>
            Konto prywatne?
        </FormLabel>
        <Switch id='priv' isChecked={priv} onChange={(e)=>setPriv(e.target.checked)}/>
        </FormControl>
        <Button onClick={handleClick} size='sm'>Zapisz</Button>
        </>
    )
}

export default AddPriv