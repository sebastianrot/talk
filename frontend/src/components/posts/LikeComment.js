import { useState } from 'react'
import url from "../urlSettings"

const LikeComment = ({id, liked, number}) => {
    const [like, setLike] = useState(liked)
    const [amount, setAmount] = useState(number)

    const handleClick = () => {
    fetch(`${url.serverUrl}/api/comment/${id}/${like ? 'unlike' : 'like'}`,  {
        method: 'POST',
        mode: 'cors',
        credentials: 'include'
    })
    .then(res=> res.json())
    .then(data=> {
        setLike(data.like)
        !like ? setAmount(prev=> prev+1) :
        setAmount(prev=> prev-1)})
    }
    

    return(
        <div>
        <button onClick={handleClick}>like</button>
        <span>{amount}</span>
        </div>
    )
}

export default LikeComment