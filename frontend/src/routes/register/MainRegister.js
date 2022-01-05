import './MainRegister.css';
import {useState} from 'react';
import SignUp from './SignUp';
import VerificationCode from './VerificationCode';

const MainRegister = () => {
    const [registerUsername, setRegisterUsername] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [recaptcha, setRecaptcha] = useState()
    const key = '6Lcq2FgdAAAAADc1DuCLrOSheBCuEOWu8Nax9ZOg'
    const [next, setNext] = useState(false)

    const states = {
        registerUsername,
        setRegisterUsername,
        registerEmail,
        setRegisterEmail,
        registerPassword,
        setRegisterPassword,
        key,
        recaptcha,
        setRecaptcha,
        setNext
    }

    return(
        <main className='main-register'>
            {!next ? <SignUp states={states}/> :
            <VerificationCode username={registerUsername} email={registerEmail} password={registerPassword}/>}
        </main>
    )
}

export default MainRegister