import { useState } from 'react'
import { Input, InputGroup, InputRightElement, InputLeftElement } from '@chakra-ui/react'
import {FaSave, FaTimes} from 'react-icons/fa'
import url from '../urlSettings'

const EditComment = ({id, post, text, edit}) => {
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
        <InputGroup>
        <InputLeftElement children={<FaSave onClick={handleClick}/>}/>
        <Input type='text' size='md' value={value} onChange={e=>setValue(e.target.value)}/>
        <InputRightElement children={<FaTimes onClick={()=>edit(false)}/>}/>
        </InputGroup>
        </div>
    )
}

export default EditComment