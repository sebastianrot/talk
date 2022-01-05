import './SignUp.css';
import { useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha'
import { useNavigate } from 'react-router-dom';
import { Input, Button, InputGroup, InputLeftElement, Stack, FormLabel, FormControl, Text} from "@chakra-ui/react"
import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa"
import urlSettings from '../../components/urlSettings';

const SignUp = ({ states }) => {
    let navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
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
            body: JSON.stringify({ username: states.registerUsername, email: states.registerEmail, 
                password: states.registerPassword, captcha: states.recaptcha})
        })
        .then(res => res.json())
        .then(data => {
            setLoading(false)
            if(data.auth) return states.setNext(true)
            setErrors(data)
        })
        .catch(err =>  setLoading(false))
    }

    useEffect(()=>{
        errors.map(val=>options[val.type] = val.msg)
        setType(prev=>({...prev, ...options}))
    },[errors])

    return(
        <section className='section-signup'>
            <Stack spacing={2}>
             <FormControl id="text">
                <FormLabel fontWeight='600' color='#293241'>Nick</FormLabel>
            <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaUserAlt/>}/>
                <Input type="text" placeholder='Nick' value={states.registerUsername} onChange={(e)=>states.setRegisterUsername(e.target.value)} isInvalid={type.username} errorBorderColor="crimson"/>
            </InputGroup>
            <Text fontSize="xs" color="hsl(359,calc(var(--saturation-factor, 1)*82.6%),59.4%)">{type.username}</Text>
            </FormControl>
            <FormControl id="email">
                <FormLabel fontWeight='600' color='#293241'>Email</FormLabel>
            <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaEnvelope/>}/>
                <Input type="email" placeholder='Email' value={states.registerEmail} onChange={(e)=>states.setRegisterEmail(e.target.value)} isInvalid={type.email} errorBorderColor="crimson"/>
            </InputGroup>
            <Text fontSize="xs" color="hsl(359,calc(var(--saturation-factor, 1)*82.6%),59.4%)">{type.email}</Text>
            </FormControl>
            <FormControl id="password">
                <FormLabel fontWeight='600' color='#293241'>Hasło</FormLabel>
            <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaLock/>}/>
                <Input type='password' placeholder='Hasło' value={states.registerPassword} onChange={(e)=>states.setRegisterPassword(e.target.value)} isInvalid={type.password} errorBorderColor="crimson"/>
            </InputGroup>
            <Text fontSize="xs" color="hsl(359,calc(var(--saturation-factor, 1)*82.6%),59.4%)">{type.password}</Text>
            </FormControl>
            <div>
            <ReCAPTCHA sitekey={states.key} onChange={(e)=>states.setRecaptcha(e)}/>
            <Text fontSize="xs" color="hsl(359,calc(var(--saturation-factor, 1)*82.6%),59.4%)">{type.recaptcha}</Text>
            </div>
            <Text fontSize="xs">Rejestrując się, akceptujesz nasze Zasady użytkowania, Politykę prywatności i Korzystanie z plików cookie.</Text>
            <Button onClick={handleClick} size="md" isLoading={loading} loadingText="Loading" style={{background: '#1071fe', color: '#fff'}} spinnerPlacement="start">Zarejestruj się</Button>
            <Button variant="link" color='#1071fe' onClick={()=>navigate('/login')}>Masz już konto?</Button>
            </Stack>
        </section>
    )
}

export default SignUp