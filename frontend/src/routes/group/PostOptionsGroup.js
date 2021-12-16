import { useDisclosure, Drawer, DrawerContent,
    DrawerBody, DrawerOverlay, Button, useClipboard, Text} from "@chakra-ui/react"
import { FaEllipsisH } from 'react-icons/fa'
import PostDeleteGroup from "./admin/PostDeleteGroup"
import Reject from "./admin/Reject"
import Block from "./admin/Block"
    
    const PostOptionsGroup = ({value, user, role}) => {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const { onCopy } = useClipboard(value.text)
        return(
            <div>
            <FaEllipsisH style={{position: 'absolute', right: '0', color: '#aab8c2'}} onClick={onOpen}/>
            <Drawer onClose={onClose} isOpen={isOpen} placement='bottom'>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerBody margin='auto'>
                <Text fontWeight='600' display='flex' justifyContent='center' marginBottom='10px'>Post</Text>
                <Button size='sm' onClick={onCopy} marginBottom='15px' width='100%'>Kopiuj tekst</Button>
                {(user.id === value.by._id || role.admin || role.mod) && <PostDeleteGroup id={value.group._id} postid={value._id}/>}
                {(role.admin || role.mod) && (
                <div style={{display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
                <Text fontWeight='600' margin='auto'>Użytkownik</Text>
                <Reject id={value.group._id} user={value.by._id}/>
                <Block id={value.group._id} user={value.by._id}/>
                </div>)}
                </DrawerBody>
                </DrawerContent>
            </Drawer>
            </div>
        )
    }

export default PostOptionsGroup