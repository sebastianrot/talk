import './MainRegister.css';
import {useState, useEffect, useContext} from 'react';
import SignUp from './SignUp';
import AuthContext from '../../context/AuthContext';
import urlSettings from '../../components/urlSettings';

const MainRegister = () => {
    const [registerUsername, setRegisterUsername] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [invisible, setInvisible] = useState(true)
    const {logged, loggedFetch} = useContext(AuthContext)

    const handleClick = () => {
        fetch(`${urlSettings.serverUrl}/api/register`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: registerUsername, email: registerEmail, 
                password: registerPassword})
        })
        .then(res => res.json())
        .then(data => {
            if(data.auth) return loggedFetch()
            setErrors(data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
            if(!registerUsername || !registerEmail || !registerPassword) return setInvisible(true)
            return setInvisible(false)
    }, [registerUsername, registerEmail, registerPassword])

    const errorMessage = errors.map((err, index)=> <span style={{color: 'red'}} key={index} data-type={err.type}>{err.msg}</span>)

    const states = {
        registerUsername,
        setRegisterUsername,
        registerEmail,
        setRegisterEmail,
        registerPassword,
        setRegisterPassword,
        handleClick,
        invisible
    }

    if(logged) {
        return(
            <span>Zostałes zarejstrowany i zalogowany</span>
        )
    }

    return(
        <main className='main-register'>
            <SignUp states={states} errors={errorMessage}/>
        </main>
    )
}

export default MainRegister