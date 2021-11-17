import './Post.css'
import {Link, useHistory} from 'react-router-dom'
import PostDelete from './PostDelete'
import Like from './Like'
import Share from './Share'
import Date from './Date'
import url from '../urlSettings'

const Post = ({value}) => {
    const history = useHistory();
    const image = value.img.map(el => <img src={`${url.serverUrl}/static/posts/${el}`} key={el} alt='zdjęcie' className='post-image'/>)
    return(
        <article className='post-article'>
            <div className='post-page-user'>
                <Link to={`/user/${value.by.username}`} style={{width: '48px', height: '48px'}}><img src={`${url.serverUrl}/static/profile/${value.by.img !== '' ? value.by.img : 'default.jpeg'}`}
                    alt='zdjęcie profilowe' style={{width: '100%', borderRadius: '999px', objectFit: 'cover'}}/></Link>
                <Link to={`/user/${value.by.username}`}>{value.by.username}</Link>
                <Date value={value.date}/>
            </div>
            <div className='post-page-post'>
                <span>{value.text}</span>
                <div>
                {image}
                </div>
                <Like id={value._id} option={'post'} liked={value.liked} number={value.like}/>
                <Share id={value._id}/>
            </div>
            <PostDelete id={value._id}/>
        </article>
    )
}

export default Post