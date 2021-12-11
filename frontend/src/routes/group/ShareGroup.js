import { Button, Drawer, DrawerBody, DrawerHeader,
    DrawerOverlay, DrawerContent, useDisclosure, IconButton} from "@chakra-ui/react"
import { FaEllipsisH } from "react-icons/fa"
import Leave from './Leave'
import EditGroup from './EditGroup'
import url from "../../components/urlSettings"

const ShareGroup = ({group, admin}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const link = `${url.clientUrl}/group/${group._id}`
    const handleClick = () => {
        navigator.clipboard.writeText(link)
    }
    return(
        <div>
        <IconButton onClick={onOpen} icon={<FaEllipsisH/>} backgroundColor='#fff'/>
        <Drawer placement='bottom' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'><div style={{display: 'flex', justifyContent:'center'}}>Opcje</div></DrawerHeader>
          <DrawerBody display='flex' flexDirection='column' margin='auto'>
            {admin && <div style={{marginBottom: '10px'}}><EditGroup group={group}/></div>}
            <div style={{marginBottom: '10px'}}><Button onClick={handleClick} size='sm'>Kopiuj link</Button></div>
            <div style={{marginBottom: '10px'}}><Leave id={group._id}/></div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
        </div>
    )
}

export default ShareGroup