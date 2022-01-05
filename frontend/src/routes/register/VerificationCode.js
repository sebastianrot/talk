import './VerificationCode.css'
import { useState, useContext } from "react"
import { HStack, PinInput, PinInputField, Button, useToast, Text } from "@chakra-ui/react"
import AuthContext from '../../context/AuthContext';
import urlSettings from "../../components/urlSettings"

const VerificationCode = ({username, email, password}) => {
    const [number, setNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const {loggedFetch} = useContext(AuthContext)
    const toast = useToast()

    const handleClick = () => {
        setLoading(true)
        fetch(`${urlSettings.serverUrl}/api/register/code`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, email: email, 
                password: password, token: number})
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
          
        })
        .catch(err =>  setLoading(false))
    }

    return(
    <section className='section-code'>
        <Text fontSize="md" marginBottom='15px' fontWeight='600' color='#293241'>Wysłaliśmy na twojego email kod weryfikacjny. Wprowadź go poniżej</Text>
        <HStack marginBottom='10px'>
        <PinInput type='alphanumeric' onChange={(e)=>setNumber(e)} size='sm'>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
        </PinInput>
        </HStack>
        <Text fontSize='sm' fontWeight='600' marginBottom='15px' color='#293241'>Kod jest aktywny przez 20 min</Text>
        <Button onClick={handleClick} size="md" isLoading={loading} loadingText="Loading" style={{background: '#1071fe', color: '#fff'}} spinnerPlacement="start">Zarejestruj się</Button>
    </section>
    )
}

export default VerificationCode