import './Post.css'
import { useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import {useDisclosure, Modal, ModalContent, ModalCloseButton, ModalOverlay, Tooltip, Text} from '@chakra-ui/react'
import { FaComment, FaCaretRight } from 'react-icons/fa'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Like from '../../components/posts/Like'
import SharePostGroup from './SharePostGroup'
import Date from '../../components/posts/Date'
import PostOptionsGroup from './PostOptionsGroup'
import AuthContext from '../../context/AuthContext'
import {ReactComponent as VerifiedLogo} from '../../components/svg/verified.svg'
import url from '../../components/urlSettings'

const Post = ({value, role}) => {
    const {myUser} = useContext(AuthContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [imgName, setImgName] = useState()

    const handleClick = (el) => {
        setImgName(el)
        onOpen()
    }

    const image = value.img.map(el =><div key={Math.floor(1000 + Math.random() * 9000)} onClick={()=>handleClick(el)}><img src={`${url.serverUrl}/static/posts/${el}`} alt='zdjęcie' className='post-group-image'/></div>)
    return(
        <article className='post-group-article'>
        <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose} size='3xl'>
           <ModalOverlay backgroundColor='rgba(38, 38, 38, 0.9)'/>
           <ModalContent>
           <ModalCloseButton position='absolute'/>
           <img src={`${url.serverUrl}/static/posts/${imgName}`} onClick={onOpen} alt='zdjęcie'/>
           </ModalContent>
       </Modal>
       <div className='post-group-page-user'>
           <Link to={`/user/${value.by.username}`} className='post-div-img'><img src={`${url.serverUrl}/static/profile/${value.by.img !== '' ? value.by.img : 'default.jpg'}`}
               alt='zdjęcie profilowe' style={{width: '100%', borderRadius: '999px', objectFit: 'cover'}}/></Link>
       <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px', justifyContent: 'center'}}>
           <div style={{display: 'flex', alignItems: 'center'}}>
           <Link to={`/user/${value.by.username}`}><Text fontWeight='600'>{value.by.username}</Text></Link>
           <div style={{marginLeft: '3px'}}>
           {value.by.verified && <Tooltip hasArrow label='weryfikacja'><VerifiedLogo/></Tooltip>}
           </div>
           <div>
           <FaCaretRight fontSize='15px'/>
           </div>
           <Link to={`/group/${value.group._id}`}><Text fontWeight='600'>{value.group.name}</Text></Link>
           </div>
           <Date value={value.date}/>
       </div>
       <PostOptionsGroup value={value} user={myUser} role={role}/>
       </div>
       <div className='post-group-page-post'>
           <Text fontSize='md'>{value.text}</Text>
           <div style={{marginTop: '5px'}}>
           <Carousel dynamicHeight emulateTouch showArrows showThumbs={false} showStatus={false}>
           {image}
           </Carousel>
           </div>
           <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '10px'}}>
           <Like id={value._id} option={`group/${value.group._id}/post`} liked={value.liked} number={value.like}/>
           <Link to={`/group/${value.group._id}/p/${value._id}`}><FaComment color='#aab8c2'/></Link>
           <SharePostGroup id={value._id} group={value.group._id}/>
           </div>
       </div>
   </article>
    )
}

export default Post