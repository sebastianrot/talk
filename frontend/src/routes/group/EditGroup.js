import { Button, Modal, ModalOverlay, ModalContent,
ModalBody, ModalHeader, ModalCloseButton, useDisclosure, Divider, Text} from '@chakra-ui/react'
import AddPhotoGroup from "./AddPhotoGroup"
import AddBannerGroup from './AddBannerGroup'
import AddDescGroup from './AddDescGroup'
import AddCategoryGroup from './AddCategoryGroup'
import AddNameGroup from './AddNameGroup'
import AddNsfwGroup from './AddNsfwGroup'
import AddPrivGroup from './AddPrivGroup'

const EditGroup = ({group}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
    <div>
        <Button onClick={onOpen} size='sm'>Edytuj</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent padding='5px 10px 15px 10px'>
            <ModalHeader margin='auto'>Ustawienia</ModalHeader>
            <Divider />
            <ModalCloseButton />
            <ModalBody>
                <div style={{marginBottom: '10px'}}>
                    <Text fontWeight='600'>Zdjęcie profilowe</Text>
                    <AddPhotoGroup id={group._id} img={group.img}/>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <Text fontWeight='600'>Banner</Text>
                    <AddBannerGroup id={group._id} banner={group.banner}/>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <Text fontWeight='600'>Nazwa</Text>
                    <AddNameGroup id={group._id}/>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <Text fontWeight='600'>Opis</Text>
                    <AddDescGroup id={group._id}/>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <AddCategoryGroup id={group._id} hobby={group.category}/>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <AddNsfwGroup id={group._id} value={group.nsfw}/>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <AddPrivGroup id={group._id} value={group.priv}/>
                </div>
            </ModalBody>
          </ModalContent>
        </Modal>
    </div>
    )
}

export default EditGroup