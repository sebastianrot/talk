import { useState, useEffect } from 'react'
import { Button } from '@chakra-ui/button'
import Comment from './Comment'
import Reply from './Reply'

const TopComment = ({value}) => {
    const [show, setShow] = useState(false)
    const [length, setLength] = useState(0)

    const replies = value.replies.map(el=><Reply key={el._id} value={el}/>)
    
    useEffect(()=>{
    value.replies.forEach(el => {
        setLength(prev=>prev+el.replies.length)
    })},[value])

    return(
        <div>
        <Comment value={value} id={value._id}/>
        {value.replies.length !== 0 && <Button size='sm' variant='ghost' marginLeft='20px' onClick={()=>setShow(!show)}>{show ? `ukryj odpowiedzi` : `pokaż ${value.replies.length + length} odpowiedzi`}</Button>}
        {show && replies}
        </div>
    )
}

export default TopComment