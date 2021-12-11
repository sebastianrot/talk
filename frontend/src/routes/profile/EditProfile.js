import './EditProfile.css'
import { Button, Modal, ModalOverlay, ModalContent,
ModalBody, ModalHeader, ModalCloseButton, useDisclosure, Divider, Text} from '@chakra-ui/react'
import AddPhoto from "./AddPhoto"
import AddBanner from './AddBanner'
import Desc from './Desc'
import AddPriv from './AddPriv'
import AddCategory from './AddCategory'

const EditProfile = ({img, banner, hobby}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
    <div>
        <Button onClick={onOpen}>Edytuj</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent padding='5px 10px 15px 10px'>
            <ModalHeader margin='auto'>Ustawienia</ModalHeader>
            <Divider />
            <ModalCloseButton />
            <ModalBody>
                <div style={{marginBottom: '10px'}}>
                    <Text fontWeight='600'>Zdjęcie profilowe</Text>
                    <AddPhoto img={img}/>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <Text fontWeight='600'>Banner</Text>
                    <AddBanner banner={banner}/>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <Text fontWeight='600'>Opis</Text>
                    <Desc/>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <AddPriv/>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <AddCategory hobby={hobby}/>
                </div>
            </ModalBody>
          </ModalContent>
        </Modal>
    </div>
    )
}

export default EditProfile