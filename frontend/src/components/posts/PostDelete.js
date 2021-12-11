import { useState, useRef } from "react"
import { Button, AlertDialog, AlertDialogFooter,
    AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, } from "@chakra-ui/react"
import url from "../urlSettings"

const PostDelete = ({id}) => {
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/post/${id}/delete`,{
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
        <Button colorScheme='red' width='100%' size='sm' onClick={()=>setIsOpen(true)}>Usuń</Button>
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold' paddingBottom='0'>
                Czy napewno chcesz usunąć ten post?
                </AlertDialogHeader>
                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                    Anuluj
                </Button>
                <Button colorScheme='red' onClick={handleClick} ml={3}>
                    Usuń
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </div>
    )
}

export default PostDelete 