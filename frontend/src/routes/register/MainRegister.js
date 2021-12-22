import './MainRegister.css';
import {useState, useContext, useEffect} from 'react';
import { useToast } from "@chakra-ui/react"
import SignUp from './SignUp';
import AuthContext from '../../context/AuthContext';
import urlSettings from '../../components/urlSettings';

const MainRegister = () => {
    const [registerUsername, setRegisterUsername] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [recaptcha, setRecaptcha] = useState()
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const {loggedFetch} = useContext(AuthContext)
    const key = '6Lcq2FgdAAAAADc1DuCLrOSheBCuEOWu8Nax9ZOg'
    const toast = useToast()
    let options = {
        all: '',
        username: '',
        email: '',
        password: '',
        recaptcha: ''
    }
    const [type, setType] = useState(options)

    const handleClick = () => {
        setLoading(true)
        fetch(`${urlSettings.serverUrl}/api/register`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: registerUsername, email: registerEmail, 
                password: registerPassword, captcha: recaptcha})
        })
        .then(res => res.json())
        .then(data => {
            setLoading(false)
            if(data.auth) {
                toast({
                    title: "Konto zostało stworzone 😃",
                    status: "success",
                    duration: 3000,
                    isClosable: true})
                return loggedFetch()
                }
            setErrors(data)
        })
        .catch(err =>  setLoading(false))
    }

    useEffect(()=>{
        errors.map(val=>options[val.type] = val.msg)
        setType(prev=>({...prev, ...options}))
    },[errors])

    const states = {
        registerUsername,
        setRegisterUsername,
        registerEmail,
        setRegisterEmail,
        registerPassword,
        setRegisterPassword,
        handleClick,
        loading,
        key,
        recaptcha,
        setRecaptcha,
        type
    }

    return(
        <main className='main-register'>
            <SignUp states={states}/>
        </main>
    )
}

export default MainRegister