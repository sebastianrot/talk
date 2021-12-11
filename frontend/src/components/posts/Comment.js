import './Comment.css'
import { useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { Button, Text, Tooltip, Drawer, DrawerBody, DrawerOverlay, DrawerContent, useDisclosure, useClipboard } from '@chakra-ui/react'
import { FaComment, FaEllipsisH, FaCircle } from 'react-icons/fa'
import AuthContext from '../../context/AuthContext'
import AddComment from './AddComment'
import Like from './Like'
import EditComment from './EditComment'
import DeleteComment from './DeleteComment'
import Date from './Date'
import {ReactComponent as VerifiedLogo} from '../svg/verified.svg'
import url from '../urlSettings'


const Comment = ({value, id}) => {
    const {myUser} = useContext(AuthContext)
    const [reply, setReply] = useState(false)
    const [edit, setEdit] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { onCopy } = useClipboard(value.text)


    return(
        <article className='comment-article'>   
           <Link to={`/user/${value.by.username}`} style={{width: '32px', height: '32px', marginTop: '10px'}}><img src={`${url.serverUrl}/static/profile/${value.by.img !== '' ? value.by.img : 'default.jpeg'}`}
                    alt='zdjęcie profilowe' style={{width: '100%', borderRadius: '50%', objectFit: 'cover'}}/></Link>  
            <div style={{width: '100%', padding: '8px'}}>
            <div className='post-page-user-comment'>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '3px'}}>
                <div style={{display: 'flex', alignItems: 'center', marginRight: '3px'}}>
                <Link to={`/user/${value.by.username}`}><Text fontWeight='600'>{value.by.username}</Text></Link>
                <div style={{marginLeft: '3px'}}>
                {value.by.verified && <Tooltip hasArrow label='weryfikacja'><VerifiedLogo/></Tooltip>}
                </div>
                </div>
                <div style={{marginRight: '3px'}}><FaCircle fontSize='5px' color='rgb(72, 72, 73)'/></div>
                <Date value={value.date}/>
            </div>
            <div style={{position: 'absolute', right: '10px'}}>
            <FaEllipsisH style={{position: 'absolute', right: '0', color: '#aab8c2'}} onClick={onOpen}/>
            <Drawer onClose={onClose} isOpen={isOpen} placement='bottom'>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerBody margin='auto'>
                <Button size='sm' onClick={onCopy} marginBottom='15px' width='100%'>Kopiuj tekst</Button>
                {myUser.id === value.by._id && <Button size='sm' onClick={()=>setEdit(!edit)} marginBottom='15px' width='100%'>Edytuj</Button>}
                {myUser.id === value.by._id && <DeleteComment id={value._id} post={value.post}/>}
                </DrawerBody>
                </DrawerContent>
            </Drawer>
            </div>
            {edit ? 
                <EditComment id={value._id} post={value.post} text={value.text} edit={setEdit}/> : <span>{value.text}</span>}
            </div>
            <div className='post-page-comment'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{marginRight: '15px'}}><Like id={value._id} option={'comment'} liked={value.liked} number={value.like}/></div>
                <FaComment color='#aab8c2' onClick={()=>setReply(!reply)}/>
                </div>
                {reply && <AddComment id={value.post} parent={id}/>}
            </div>
            </div>
        </article>
    )
}

export default Comment