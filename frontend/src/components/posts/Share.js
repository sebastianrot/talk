import {FacebookShareButton, TwitterShareButton, 
    WhatsappShareButton} from 'react-share'
import { useDisclosure, Drawer, DrawerOverlay, 
    DrawerContent, DrawerHeader, DrawerCloseButton } from '@chakra-ui/react'
import {FaFacebook, FaWhatsappSquare, FaTwitter, FaCopy, FaShareAlt} from 'react-icons/fa'
import url from "../urlSettings"

const Share = ({id}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const link = `${url.clientUrl}/p/${id}`
    const handleClick = () => {
        navigator.clipboard.writeText(link)
    }

    return(
        <div>
        <FaShareAlt onClick={onOpen} color='#aab8c2' cursor='pointer'/>
        <Drawer placement='bottom' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
                <span style={{display: 'flex', justifyContent: 'center'}}>Udostępnij</span>
                <div style={{display: 'flex', flexDirection: 'row', maxWidth: '1100px', justifyContent: 'space-around', margin: 'auto', marginTop: '20px'}}>
                <button onClick={handleClick}><FaCopy fontSize='27px'/></button>
                <FacebookShareButton url={link}><FaFacebook fontSize='27px'/></FacebookShareButton>
                <TwitterShareButton url={link}><FaTwitter fontSize='27px'/></TwitterShareButton>
                <WhatsappShareButton url={link}><FaWhatsappSquare fontSize='27px'/></WhatsappShareButton>
                </div>
            </DrawerHeader>
            </DrawerContent>
        </Drawer>
        </div>
    )
}

export default Share