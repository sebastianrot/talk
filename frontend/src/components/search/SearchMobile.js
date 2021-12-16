import {  Modal, ModalOverlay,ModalContent, ModalHeader,
 ModalBody, ModalCloseButton,IconButton, useDisclosure, Input,
InputGroup, InputLeftElement} from '@chakra-ui/react'
import { FaSearch } from "react-icons/fa";

const SearchMobile = ({value, handleChange, handleKey, setClick}) =>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <>
        <IconButton variant='ghost' size="md" marginRight='5px' onClick={onOpen} icon={<FaSearch fontSize='18px'/>}/>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent top='0px' width='100%'>
            <InputGroup size="lg">
            <InputLeftElement pointerEvents="none" children={<FaSearch/>}/>
            <Input type="search" placeholder="Szukaj..." value={value} onChange={handleChange} onKeyUp={handleKey}/>
            </InputGroup>
          </ModalContent>
        </Modal>
        </>
    )
}

export default SearchMobile