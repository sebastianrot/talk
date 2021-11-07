import { useState } from "react"
import url from "../../components/urlSettings"
import PhotoPreview from "./PhotoPreview"

const AddBanner = () => {
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
        fetch(`${url.serverUrl}/api/user/banner`,{
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
       <div>
           {choose && <PhotoPreview prev={prevImageUrl} cropped={cropped} setCropped={setCropped} show={show} setShow={setShow} aspect={aspect}/>}
           {image !== '' && <img src={`${url.serverUrl}/static/${image}`} alt='zdjecie profilowe' style={{width: '250px'}}/>}
           <form onSubmit={handleSubmit}>
           <input type='file' onChange={(e)=>handleChange(e)}/>
           <input type='submit' value='Zapisz'/>
           </form>
           {error && <span style={{color: 'red'}}>Zdjęcie jest nie prawidłowe</span>}
       </div>
    )
}

export default AddBanner