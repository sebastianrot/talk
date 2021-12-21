import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {Button ,AlertDialog, AlertDialogFooter,
    AlertDialogHeader, AlertDialogContent, AlertDialogOverlay} from '@chakra-ui/react'

const NotLogged = ({notlogin}) => {
    const [isOpen, setIsOpen] = useState(true)
    const onClose = () =>{
        setIsOpen(false)
        notlogin(false)}
    const cancelRef = useRef()
    let navigate = useNavigate()

    return(
        <section>
        <AlertDialog isOpen={isOpen}
            leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Nowy? Zaloguj lub zarejestruj się
                </AlertDialogHeader>
                <AlertDialogFooter>
                <Button variant="outline" onClick={()=>navigate('/login')} ml={3}>
                    Login
                </Button>
                <Button bg='#1071fe' color='#fff' size="md" _hover={{background: '#0c5bce'}} onClick={()=>navigate('/register')} ml={3}>
                    Rejestracja
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </section>
    )
}

export default NotLogged