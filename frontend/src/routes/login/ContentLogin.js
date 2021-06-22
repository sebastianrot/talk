import './ContentLogin.css';
import {useContext, useState} from 'react';
import SignIn from './SignIn';
import { useHistory, Redirect } from "react-router-dom";
import AuthContext from '../../context/AuthContext';
import urlSettings from '../../components/urlSettings';


const ContentLogin = () => {
    const {logged, loggedFetch} = useContext(AuthContext)

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [error, setError] = useState()

    const handleClick = () => {
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
        .then(data => setError(data.error))
        .then(() => loggedFetch())
        .catch(err => console.log(err))
    }

    const states = {
        loginEmail,
        setLoginEmail,
        loginPassword,
        setLoginPassword,
        handleClick
    }

    if(logged) return(
        <Redirect to='/'/>
    )

    return(
        <main className='main-login'>
           <SignIn {...states} err={error}/>
        </main>
    )
}

export default ContentLogin