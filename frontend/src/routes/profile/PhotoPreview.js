import './PhotoPreview.css'

const PhotoPreview = ({prev}) => {
    return(
        <article className='prevphoto-article'>
            <span>wybrane zdjecie</span>
            <img src={prev} alt='Zdjecie profilowe'/>
        </article>
    )
}

export default PhotoPreview