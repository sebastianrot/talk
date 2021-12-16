import { useDisclosure, Drawer, DrawerContent,
    DrawerBody, DrawerOverlay, Button} from "@chakra-ui/react"
import Reject from "./Reject"
import Block from "./Block"

const AdminAction = ({id, user}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <div>
            <Button variant='ghost' size='sm' onClick={onOpen}>Akcje</Button>
            <Drawer onClose={onClose} isOpen={isOpen} placement='bottom'>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerBody margin='auto'>
                <div style={{display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
                <Reject id={id} user={user}/>
                <Block id={id} user={user}/>
                </div>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default AdminAction