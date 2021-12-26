import './Post.css'
import { useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import {useDisclosure, Modal, ModalContent, ModalCloseButton, ModalOverlay, Tooltip, Text} from '@chakra-ui/react'
import {FaComment} from 'react-icons/fa'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Like from './Like'
import Share from './Share'
import Date from './Date'
import PostOptions from './PostOptions'
import AuthContext from '../../context/AuthContext'
import Linkify from 'linkify-react'
import 'linkify-plugin-mention';
import {ReactComponent as VerifiedLogo} from '../svg/verified.svg'
import url from '../urlSettings'

const Post = ({value}) => {
    const {myUser} = useContext(AuthContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [imgName, setImgName] = useState()

    const handleClick = (el) => {
        setImgName(el)
        onOpen()
    }

    const image = value.img.map(el =><div key={Math.floor(1000 + Math.random() * 9000)} onClick={()=>handleClick(el)}><img alt='zdjęcie' src={`${url.serverUrl}/static/posts/${el}`} className='post-image' /></div>)

    const options = {
        className: 'new-link',
        formatHref: {
            mention: (href) => '/user' + href
          }
      }

    return(
        <article className='post-article'>
             <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose} size='3xl'>
                <ModalOverlay backgroundColor='rgba(38, 38, 38, 0.9)'/>
                <ModalContent>
                <ModalCloseButton position='absolute'/>
                <img src={`${url.serverUrl}/static/posts/${imgName}`} onClick={onOpen} alt='zdjęcie'/>
                </ModalContent>
            </Modal>
            <div className='post-page-user'>
                <Link to={`/user/${value.by.username}`} className='post-div-img'><img src={`${url.serverUrl}/static/profile/${value.by.img !== '' ? value.by.img : 'default.jpg'}`}
                    alt='zdjęcie profilowe' style={{width: '100%', borderRadius: '999px', objectFit: 'cover'}}/></Link>
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px', justifyContent: 'center'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <Link to={`/user/${value.by.username}`}><Text fontWeight='600'>{value.by.username}</Text></Link>
                <div style={{marginLeft: '3px'}}>
                {value.by.verified && <Tooltip hasArrow label='weryfikacja'><VerifiedLogo/></Tooltip>}
                </div>
                </div>
                <Date value={value.date}/>
            </div>
            <PostOptions value={value} user={myUser}/>
            </div>
            <div className='post-page-post'>
                <Text fontSize='md'><Linkify options={options}>{value.text}</Linkify></Text>
                <div style={{marginTop: '5px'}}>
                <Carousel dynamicHeight emulateTouch showArrows showThumbs={false} showStatus={false}>
                {image}
                </Carousel>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '10px'}}>
                <Like id={value._id} option={'post'} liked={value.liked} number={value.like}/>
                <Link to={`/p/${value._id}`}><FaComment color='#aab8c2'/></Link>
                <Share id={value._id}/>
                </div>
            </div>
        </article>
    )
}

export default Post