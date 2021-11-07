import './EditProfile.css'
import AddPhoto from "./AddPhoto"
import AddBanner from './AddBanner'
import Desc from './Desc'
import url from '../../components/urlSettings'

const EditProfile = ({state, img, banner}) => {

    return(
        <article className='edit-profile-article'>
            <div className='edit-profile-panel'>
                <div className='edit-profile-cancel'>
                    <button onClick={()=>state(false)}>X</button>
                </div>
                <div className='edit-profile-photo'>
                    <span>Zdjęcie profilowe</span>
                    <img src={`${url.serverUrl}/static/profile/${img}`} alt='zdjęcie profilowe' style={{width: '150px', borderRadius: '50%', objectFit: 'cover'}}/>
                    <AddPhoto/>
                    <img src={`${url.serverUrl}/static/banner/${banner}`} alt='banner' style={{width: '100%', objectFit: 'cover'}}/>
                    <AddBanner/>
                </div>
                <div className='edit-profile-desc'>
                    <span>Opis</span>
                    <Desc/>
                </div>
            </div>
        </article>
    )
}

export default EditProfile