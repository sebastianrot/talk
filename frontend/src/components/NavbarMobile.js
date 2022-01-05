import { IconButton, useDisclosure, Drawer, 
    DrawerBody, DrawerContent, DrawerOverlay, Button } from "@chakra-ui/react"
import { FaBell, FaCompass, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LogOut from "./LogOut";

const NavbarMobile = ({count, myUser}) => {
    let navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <div style={{width: '100%', background: '#fff', display: 'flex', flexDirection: 'row'}}>
                <IconButton variant="ghost" onClick={onOpen} icon={<FaUserAlt/>} flex='50%'/>
                <IconButton variant="ghost" icon={<FaCompass fontSize='18px'/>} onClick={()=>navigate('/groups/discover')} flex='50%'/>
                <div style={{position: 'relative', flex: '50%', display: 'flex', justifyContent: 'center'}}>
                <IconButton variant='ghost' size="md" icon={<FaBell fontSize='18px'/>} onClick={()=>navigate('/notifications')} width='100%'/>
                {count===0 ? null : <div style={{borderRadius:'50%', position: 'absolute',marginLeft: '12px', marginTop: '5px', height: '10px', width: '10px', background: '#fed7d7'}}></div>}
                </div>
                <Drawer placement='bottom' onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                    <DrawerBody display='flex' flexDirection='column'>
                    <Button variant='ghost' onClick={()=>navigate(`/user/${myUser.username}`)}>Konto</Button>
                    <Button variant='ghost' onClick={()=>navigate(`/user/${myUser.username}/groups`)}>Grupy</Button>
                    <Button variant='ghost' onClick={()=>navigate(`/groups/create`)}>Stwórz grupe</Button>
                    <Button variant='ghost' onClick={()=>navigate(`/settings`)}>Ustawienia</Button>
                    <Button variant='ghost'><LogOut/></Button>
                    </DrawerBody>
                    </DrawerContent>
                </Drawer>
        </div>
    )
}

export default NavbarMobile