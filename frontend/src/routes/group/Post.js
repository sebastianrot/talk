import { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDisclosure, Modal, ModalContent, ModalCloseButton, ModalOverlay} from '@chakra-ui/react'
import Like from '../../components/posts/Like'
import Share from '../../components/posts/Share'
import SharePostGroup from './SharePostGroup'
import Date from '../../components/posts/Date'
import PostDeleteGroup from './admin/PostDeleteGroup'
import url from '../../components/urlSettings'

const Post = ({value}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [imgName, setImgName] = useState()

    const handleClick = (el) => {
        setImgName(el)
        onOpen()
    }

    const image = value.img.map(el => <img src={`${url.serverUrl}/static/posts/${el}`} key={Math.floor(1000 + Math.random() * 9000)} onClick={()=>handleClick(el)} alt='zdjęcie' className='post-image'/>)
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
                <Link to={`/user/${value.by.username}`} style={{width: '48px', height: '48px'}}><img src={`${url.serverUrl}/static/profile/${value.by.img !== '' ? value.by.img : 'default.jpeg'}`}
                    alt='zdjęcie profilowe' style={{width: '100%', borderRadius: '999px', objectFit: 'cover'}}/></Link>
                <Link to={`/user/${value.by.username}`}>{value.by.username}</Link>
                <Link to={`/group/${value.group._id}`}>{value.group.name}</Link>
                <Date value={value.date}/>
            </div>
            <div className='post-page-post'>
                <span style={{marginBottom: '20px'}}>{value.text}</span>
                <div>
                {image}
                </div>
                <Like id={value._id} option={`group/${value.group._id}/post`} liked={value.liked} number={value.like}/>
                <SharePostGroup id={value._id} group={value.group._id}/>
            </div>
            <PostDeleteGroup id={value.group._id} postid={value._id}/>
        </article>
    )
}

export default Post