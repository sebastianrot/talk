import './PhotoPreview.css'
import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import croppImg from './createImage'

const PhotoPreview = ({prev, cropped, setCropped, show, setShow, aspect}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
      }, [])

    const handleClick = async() => {
        try{
        const croppedImage = await croppImg(
            prev,
            croppedAreaPixels,
          )
          setCropped(croppedImage)
          setShow(false)
        }catch(err){
            console.log(err)
        }
    }
    return(
        <article className='prevphoto-article'>
        {show ? <Cropper
            image={prev}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            /> : <img src={cropped} style={{width: '100%', objectFit: 'cover'}} alt='Zdjecie profilowe' className='image-preview'/>}
            <button onClick={handleClick} style={{position: 'absolute'}}>Pokaż</button>
        </article>
    )
}

export default PhotoPreview