import './ChangePassword.css'
import { useState } from "react"
import { InputGroup, Input, InputLeftElement, Button, FormControl, FormLabel, useToast } from "@chakra-ui/react"
import { FaLock } from "react-icons/fa"
import url from "../../components/urlSettings"

const ChangePassword = () => {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const toast = useToast()

    const handleClick = () =>{
        fetch(`${url.serverUrl}/api/password`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password, newpassword: newPassword})
        })
        .then(res => res.json())
        .then(data=>{
            if(data.add) return(
                toast({
                    title: "Hasło zostało zmienione",
                    status: "success",
                    duration: 3000,
                    isClosable: true})
            )
            if(data.error) return(
                toast({
                    title: "Podaj poprawne hasło",
                    status: "error",
                    duration: 3000,
                    isClosable: true})
            )
        })
    }

    return(
        <article className="article-password-change">
            <FormControl id="password" marginBottom='12px'>
            <FormLabel fontWeight='600' color='#293241'>Hasło</FormLabel>
            <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaLock/>}/>
                <Input type='password' placeholder='Hasło' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </InputGroup>
            </FormControl>
            <FormControl id="password" marginBottom='12px'>
            <FormLabel fontWeight='600' color='#293241'>Nowe hasło</FormLabel>
            <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaLock/>}/>
                <Input type='password' placeholder='Nowe hasło' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
            </InputGroup>
            </FormControl>
            <Button onClick={handleClick} size="md" style={{background: '#1071fe', color: '#fff'}}>Zmień hasło</Button>
        </article>
    )
}

export default ChangePassword