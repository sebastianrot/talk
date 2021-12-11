import { useDisclosure, Drawer, DrawerContent,
DrawerBody, DrawerOverlay, Button, useClipboard} from "@chakra-ui/react"
import { FaEllipsisH } from 'react-icons/fa'
import PostDelete from './PostDelete'

const PostOptions = ({value, user}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { onCopy } = useClipboard(value.text)
    return(
        <div>
        <FaEllipsisH style={{position: 'absolute', right: '0', color: '#aab8c2'}} onClick={onOpen}/>
        <Drawer onClose={onClose} isOpen={isOpen} placement='bottom'>
            <DrawerOverlay />
            <DrawerContent>
            <DrawerBody margin='auto'>
            <Button size='sm' onClick={onCopy} marginBottom='15px' width='100%'>Kopiuj tekst</Button>
            {user.id === value.by._id && <PostDelete id={value._id}/>}
            </DrawerBody>
            </DrawerContent>
        </Drawer>
        </div>
    )
}

export default PostOptions