import { useDisclosure, Drawer, DrawerContent,
    DrawerBody, DrawerOverlay, Button} from "@chakra-ui/react"
import url from "../../components/urlSettings"

const ChangeRole = ({id, user}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleClick = (role) => {
        fetch(`${url.serverUrl}/api/group/${id}/user/${user}/role/${role}`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }})
    }

    return(
        <>
        <Button variant='ghost' size='sm' onClick={onOpen}>Zmień role</Button>
            <Drawer onClose={onClose} isOpen={isOpen} placement='bottom'>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerBody margin='auto'>
                <div style={{display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
                <Button variant='ghost' onClick={()=>handleClick('admin')}>admin</Button>
                <Button variant='ghost' onClick={()=>handleClick('mod')}>mod</Button>
                <Button variant='ghost' onClick={()=>handleClick('user')}>usuń range</Button>
                </div>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ChangeRole