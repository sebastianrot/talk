import {useState} from 'react'
import url from '../urlSettings'

const AddComment = ({id}) => {
    const [comment, setComment] = useState('')

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/post/${id}/comment/add`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment })
        })
        setComment('')
    }

    return(
    <div>
        <input type='text' placeholder='Dodaj komentarz...' onChange={e => setComment(e.target.value)} value={comment}/>
        <button onClick={handleClick}>Opublikuj</button>
    </div>    
    )
}

export default AddComment