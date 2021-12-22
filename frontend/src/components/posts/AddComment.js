import {useState} from 'react'
import { Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import { FaPaperPlane } from 'react-icons/fa'
import url from '../urlSettings'

const AddComment = ({id, parent}) => {
    const [comment, setComment] = useState('')
    const [res, setRes] = useState([])
    const [added, setAdded] = useState(false)
    const [error, setError] = useState(false)
    const toast = useToast()

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/post/${id}/comment/add`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment, parent })
        })
        .then(res=>res.json())
        .then(data=>{
            setRes(prev=>[...prev, data])
            setError(false)
            setAdded(true)
        }).catch(err=>setError(true))
        setComment('')

        toast({
            title: 'Komentarz dodany 😃',
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
    }

    return(
    <div style={{padding: '10px 10px 3px 10px'}}>
        <InputGroup>
        <Input type='text' placeholder='Dodaj komentarz' onChange={e => setComment(e.target.value)} value={comment}/>
        <InputRightElement children={<FaPaperPlane/>} onClick={handleClick}/>
        </InputGroup>
        {error && <span style={{color: 'red', fontSize: '14px'}}>błąd</span>}
    </div>
    )
}

export default AddComment