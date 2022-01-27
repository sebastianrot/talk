import { useState } from "react"
import { Button } from "@chakra-ui/button"
import { FaCamera } from "react-icons/fa"
import PhotoPreview from "../profile/PhotoPreview"
import url from "../../components/urlSettings"

const AddBanner = ({id, banner}) => {
    const[image, setImage] = useState('')
    const[prevImageUrl, setPrevImageUrl] = useState('')
    const[choose, setChoose] = useState(false)
    const[show, setShow] = useState(false)
    const [cropped, setCropped] = useState('')
    const[error, setError] = useState(false)
    const [aspect, setAspect] = useState(3/1)

    const handleChange = (e) => {
        let files = e.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            setPrevImageUrl(reader.result)
        }
        reader.readAsDataURL(files)
        setChoose(true)
        setShow(true)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        let response = await fetch(cropped);
        let data = await response.blob();
        let files = new File([data], "banner", {type: data.type});
        const formData = new FormData()
        formData.append('image', files)
        setChoose(false)
        fetch(`${url.serverUrl}/api/group/${id}/banner`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData
            })
            .then(res=> res.json())
            .then(data=> {
                setError(false)
                setImage(data.path)
            })
            .catch(err=> {
                setError(true)
            })
        
    }

    return(
        <>
        {choose && <PhotoPreview prev={prevImageUrl} setCropped={setCropped} show={show} setShow={setShow} aspect={aspect} setClose={setChoose}/>}
        <div>
            <form onSubmit={handleSubmit}>
            <input type='file' onChange={(e)=>handleChange(e)} id='file-input-banner' style={{display: 'none'}}/>
            <label htmlFor='file-input-banner' style={{display: 'flex', justifyContent: 'center', position: 'relative'}}>
             <div style={{background: 'rgba(0, 0, 0, 0.5)', width: '100%', height: '100%', position: 'absolute'}}></div>
            {!choose ? <img src={`${url.serverUrl}/static/bannergroup/${banner==='' ? 'default.jpg' : banner}`} alt='banner'/> : (
                <img src={cropped} alt='banner'/>
            )} 
             <div style={{position: 'absolute', zIndex: 1, top: '50%'}}>
            <FaCamera fontSize='18px' color='#edf2f7'/>
            </div>
            </label>
            <Button type='submit' size='sm' marginTop='10px'>Zapisz</Button>
            </form>
            {error && <span style={{color: 'red'}}>Zdjęcie jest nieprawidłowe</span>}
        </div>
        </>
    )
}

export default AddBanner