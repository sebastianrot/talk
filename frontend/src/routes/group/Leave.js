import { useState, useRef } from 'react'
import { Button, AlertDialog, AlertDialogFooter,
    AlertDialogHeader, AlertDialogContent, AlertDialogOverlay} from "@chakra-ui/react"
import url from '../../components/urlSettings'

const Leave = ({id}) => {
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/${id}/leave`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        onClose()
    }

    return(
        <>
        <Button size='sm' colorScheme='red' width='100%' onClick={()=>setIsOpen(true)}>Wyjdź</Button>
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
        <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold' paddingBottom='0'>
            Czy napewno chcesz opuścić grupe?
            </AlertDialogHeader>
            <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
                Anuluj
            </Button>
            <Button colorScheme='red' onClick={handleClick} ml={3}>
                Tak
            </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
    </>
    ) 
}

export default Leave