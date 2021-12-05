import './SignUp.css';
import ReCAPTCHA from 'react-google-recaptcha'
import { useHistory } from 'react-router-dom';
import { Input, Button, InputGroup, InputLeftElement, Stack, FormLabel, FormControl, Text} from "@chakra-ui/react"
import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa"

const SignUp = ({ states }) => {
    let history = useHistory()
    return(
        <section className='section-signup'>
            <Stack spacing={2}>
             <FormControl id="text">
                <FormLabel fontWeight='600' color='#293241'>Nick</FormLabel>
            <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaUserAlt/>}/>
                <Input type="text" placeholder='Nick' value={states.registerUsername} onChange={(e)=>states.setRegisterUsername(e.target.value)} isInvalid={states.type.username} errorBorderColor="crimson"/>
            </InputGroup>
            <Text fontSize="xs" color="hsl(359,calc(var(--saturation-factor, 1)*82.6%),59.4%)">{states.type.username}</Text>
            </FormControl>
            <FormControl id="email">
                <FormLabel fontWeight='600' color='#293241'>Email</FormLabel>
            <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaEnvelope/>}/>
                <Input type="email" placeholder='Email' value={states.registerEmail} onChange={(e)=>states.setRegisterEmail(e.target.value)} isInvalid={states.type.email} errorBorderColor="crimson"/>
            </InputGroup>
            <Text fontSize="xs" color="hsl(359,calc(var(--saturation-factor, 1)*82.6%),59.4%)">{states.type.email}</Text>
            </FormControl>
            <FormControl id="password">
                <FormLabel fontWeight='600' color='#293241'>Hasło</FormLabel>
            <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaLock/>}/>
                <Input type='password' placeholder='Hasło' value={states.registerPassword} onChange={(e)=>states.setRegisterPassword(e.target.value)} isInvalid={states.type.password} errorBorderColor="crimson"/>
            </InputGroup>
            <Text fontSize="xs" color="hsl(359,calc(var(--saturation-factor, 1)*82.6%),59.4%)">{states.type.password}</Text>
            </FormControl>
            <div>
            <ReCAPTCHA sitekey={states.key} onChange={(e)=>states.setRecaptcha(e)}/>
            <Text fontSize="xs" color="hsl(359,calc(var(--saturation-factor, 1)*82.6%),59.4%)">{states.type.recaptcha}</Text>
            </div>
            <Text fontSize="xs">Rejestrując się, akceptujesz nasze Zasady użytkowania, Politykę prywatności i Korzystanie z plików cookie.</Text>
            <Button onClick={states.handleClick} size="md" isLoading={states.loading} loadingText="Loading" style={{background: '#1071fe', color: '#fff'}} spinnerPlacement="start">Zarejestruj się</Button>
            <Button variant="link" color='#1071fe' onClick={()=>history.push('/login')}>Masz już konto?</Button>
            </Stack>
        </section>
    )
}

export default SignUp