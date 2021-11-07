import {Link, useHistory} from 'react-router-dom'
import Like from '../../components/posts/Like'
import Share from '../../components/posts/Share'
import Date from '../../components/posts/Date'
import url from '../../components/urlSettings'

const Post = ({value}) => {
    const image = value.img.map(el => <img src={`${url.serverUrl}/static/posts/${el}`} key={el} alt='zdjęcie' className='post-image'/>)
    return(
        <article className='post-article'>
            <div className='post-page-user'>
                <Link to={`/user/${value.by.username}`} style={{width: '48px', height: '48px'}}><img src={`${url.serverUrl}/static/profile/${value.by.img !== '' ? value.by.img : 'default.jpeg'}`}
                    alt='zdjęcie profilowe' style={{width: '100%', borderRadius: '999px', objectFit: 'cover'}}/></Link>
                <Link to={`/user/${value.by.username}`}>{value.by.username}</Link>
                <Link to={`/group/${value.group._id}`}>{value.group.name}</Link>
                <Date value={value.date}/>
            </div>
            <div className='post-page-post'>
                <span>{value.text}</span>
                <div>
                {image}
                </div>
                <Like id={value._id} option={'group'} liked={value.liked} number={value.like}/>
                <Share id={value._id}/>
            </div>
        </article>
    )
}

export default Post