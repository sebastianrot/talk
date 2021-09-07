import './PhotoPreview.css'

const PhotoPreview = ({prev, id}) => {
    const handleClick = () => {
   
    }
    return(
        <article className='prevphoto-article'>
            <button onClick={handleClick}>Usuń</button>
            <img src={prev} alt='Zdjecie profilowe' className='image-preview'/>
        </article>
    )
}

export default PhotoPreview