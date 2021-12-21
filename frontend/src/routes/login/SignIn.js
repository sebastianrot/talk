import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import { Input, Button, InputGroup, InputLeftElement, Stack, FormLabel, FormControl} from "@chakra-ui/react"
import { FaEnvelope, FaLock } from "react-icons/fa"
import { ReactComponent as Logo} from '../../components/svg/logo.svg'

const SignIn = ({ handleClick, loginEmail, setLoginEmail, loginPassword, setLoginPassword, err, loading }) => {
    let navigate = useNavigate()
    return(
        <section className='section-signin'>
            <Stack spacing={4}>
            <Logo style={{margin: 'auto', width: '120px'}}/>
            <FormControl id="email">
                <FormLabel fontWeight='600' color='#293241'>Email</FormLabel>
            <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaEnvelope/>}/>
                <Input type="email" placeholder='Email' value={loginEmail} onChange={e => setLoginEmail(e.target.value)} isInvalid={err} errorBorderColor="crimson"/>
            </InputGroup>
            </FormControl>
            <FormControl id="password">
                <FormLabel fontWeight='600' color='#293241'>Hasło</FormLabel>
            <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaLock/>}/>
                <Input type='password' placeholder='Hasło' value={loginPassword} onChange={e => setLoginPassword(e.target.value)} isInvalid={err} errorBorderColor="crimson"/>
            </InputGroup>
            </FormControl>
            <Button onClick={handleClick} size="md" isLoading={loading} loadingText="Loading" style={{background: '#1071fe', color: '#fff'}} spinnerPlacement="start">Zaloguj się</Button>
            <Button variant="link" color='#1071fe' onClick={()=>navigate('/register')}>Nowy na Linnku?</Button>
            </Stack>
        </section>
    )
}

export default SignIn