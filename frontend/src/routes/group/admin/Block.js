import { useState, useRef } from 'react'
import { Button, AlertDialog, AlertDialogFooter,
    AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, } from "@chakra-ui/react"
import url from '../../../components/urlSettings'


const Block = ({id, user}) => {

    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

 const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/${id}/user/${user}/block`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        onClose()
    }

    return(
        <div>
        <Button size='sm' colorScheme='red' marginTop='10px' width='100%' onClick={()=>setIsOpen(true)}>Zablokuj</Button>
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold' paddingBottom='0'>
                Czy napewno chcesz usunąć użytkownika?
                </AlertDialogHeader>
                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                    Anuluj
                </Button>
                <Button colorScheme='red' onClick={handleClick} ml={3}>
                    Zablokuj
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </div>
    )
}

export default Block