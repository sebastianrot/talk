import './PhotoPreview.css'
import { useState, useCallback } from 'react'
import { IconButton } from '@chakra-ui/react'
import {FaCheck, FaTimes} from 'react-icons/fa'
import Cropper from 'react-easy-crop'
import croppImg from './createImage'

const PhotoPreview = ({prev, setCropped, show, setShow, aspect, setClose}) => {
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
        {show && (
        <div>
        <Cropper
            image={prev}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            />
            <div className='prevphoto-button'>
            <IconButton icon={<FaTimes/>} onClick={()=>setClose(false)}/>
            <IconButton icon={<FaCheck/>} onClick={handleClick}/></div></div>)}
        </article>
    )
}

export default PhotoPreview