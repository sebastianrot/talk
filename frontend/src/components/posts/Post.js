import './Post.css'
import {Link} from 'react-router-dom'
import Like from './Like'
import Share from './Share'
import Date from './Date'
import url from '../urlSettings'

const Post = ({value, user}) => {
    const image = value.img.map(el => <img src={`${url.serverUrl}/static/posts/${el}`} alt='zdjęcie' className='post-image'/>)
    return(
        <article className='post-article'>
            <div className='post-page-user'>
                <Link to={`/user/${user.username}`} style={{width: '48px', height: '48px'}}><img src={`${url.serverUrl}/static/profile/${user.img !== '' ? user.img : 'default.jpeg'}`}
                    alt='zdjęcie profilowe' style={{width: '100%', borderRadius: '999px', objectFit: 'cover'}}/></Link>
                <Link to={`/user/${user.username}`}>{user.username}</Link>
                <Date value={value.date}/>
            </div>
            <div className='post-page-post'>
                <span>{value.text}</span>
                <div>
                {image}
                </div>
                <Like id={value._id} liked={value.liked} number={value.like.length}/>
                <Share id={value._id}/>
            </div>
        </article>
    )
}

export default Post