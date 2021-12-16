import {useState} from 'react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FaPaperPlane } from 'react-icons/fa'
import Comment from './Comment'
import url from '../urlSettings'

const AddComment = ({id, parent}) => {
    const [comment, setComment] = useState('')
    const [res, setRes] = useState([])
    const [added, setAdded] = useState(false)

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
            setAdded(true)
        })
        setComment('')
    }

    const result = res.map(val=><Comment value={val} id={val._id}/>)    

    return(
    <div>
    <div style={{padding: '10px 10px 3px 10px'}}>
        <InputGroup>
        <Input type='text' placeholder='Dodaj komentarz' onChange={e => setComment(e.target.value)} value={comment}/>
        <InputRightElement children={<FaPaperPlane/>} onClick={handleClick}/>
        </InputGroup>
    </div>
    {added && result}
    </div>    
    )
}

export default AddComment