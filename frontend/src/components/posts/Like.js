import './Like.css'
import { useState, useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import NotLogged from '../NotLogged'
import { ReactComponent as Heart} from '../../components/svg/heart.svg'
import url from '../urlSettings'

const Like = ({id, option, liked, number}) => {
    const [like, setLike] = useState(liked)
    const [amount, setAmount] = useState(number)
    const [loginMessage, setLoginMessage] = useState(false)
    const {logged} = useContext(AuthContext)

    const handleClick = () => {
        logged ? (fetch(`${url.serverUrl}/api/${option}/${id}/${like ? 'unlike' : 'like'}`,  {
            method: 'POST',
            mode: 'cors',
            credentials: 'include'
        })
        .then(res=> res.json())
        .then(data=> {
            setLike(data.like)
            !like ? 
            setAmount(prev=> prev+1) :
             setAmount(prev=> prev-1)})) : setLoginMessage(true)
    }
    return(
        <div className='div-like'>
            {loginMessage && <NotLogged/>}
        <div onClick={handleClick} className='icon-heart' style={like ? {fill: '#e2264d', animation: 'like 0.4s ease-in-out'} : {fill: '#aab8c2'}}>
        <Heart/>
        </div>
        <span>{amount}</span>
        </div>
    )
}

export default Like