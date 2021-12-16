import { useDisclosure, Drawer, DrawerContent,
    DrawerBody, DrawerOverlay, Button} from "@chakra-ui/react"
import Accept from './Accept'
import Reject from './Reject'
import Block from './Block'

const AdminAccept = ({id, user}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <div>
            <Button variant='ghost' size='sm' onClick={onOpen}>Akcje</Button>
            <Drawer onClose={onClose} isOpen={isOpen} placement='bottom'>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerBody margin='auto'>
                <div style={{display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
                <Accept id={id} user={user}/>
                <Reject id={id} user={user}/>
                <Block id={id} user={user}/>
                </div>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default AdminAccept