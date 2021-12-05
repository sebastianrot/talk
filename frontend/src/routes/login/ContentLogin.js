import './ContentLogin.css';
import {useContext, useState} from 'react';
import SignIn from './SignIn';
import AuthContext from '../../context/AuthContext';
import urlSettings from '../../components/urlSettings';


const ContentLogin = () => {
    const {loggedFetch} = useContext(AuthContext)

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);


    const handleClick = () => {
        setLoading(true)
        fetch(`${urlSettings.serverUrl}/api/login`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: loginEmail, password: loginPassword})
        })
        .then(res => res.json())
        .then(data =>{
            setError(true)
            setLoading(false)})
        .then(() => loggedFetch())
        .catch(err => {
            setError(true)
            setLoading(false)})
    }

    const states = {
        loginEmail,
        setLoginEmail,
        loginPassword,
        setLoginPassword,
        handleClick,
        loading
    }

    return(
        <main className='main-login'>
           <SignIn {...states} err={error}/>
        </main>
    )
}

export default ContentLogin