import './Like.css'
import { useState } from 'react'
import { ReactComponent as Heart} from '../../components/svg/heart.svg'
import url from '../urlSettings'

const Like = ({id, liked, number}) => {
    const [like, setLike] = useState(liked)
    const [amount, setAmount] = useState(number)

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/post/${id}/like`,  {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: like ? JSON.stringify({action: 'unlike'}) : JSON.stringify({action: 'like'})
        })
        .then(res=> res.json())
        .then(data=> console.log(data))
        setLike(!like)
        !like ? setAmount(prev=> prev+1) : setAmount(prev=> prev-1)
    }
    return(
        <div className='div-like'>
        <div onClick={handleClick} className='icon-heart' style={like ? {fill: '#e2264d', animation: 'like 0.4s ease-in-out'} : {fill: '#aab8c2'}}>
        <Heart/>
        </div>
        <span>{amount}</span>
        </div>
    )
}

export default Like