import { useState } from "react"
import url from "../../components/urlSettings"
import PhotoPreview from "./PhotoPreview"

const AddPhoto = () => {

    const[file, setFile] = useState('')
    const[image, setImage] = useState('')
    const[prevImageUrl, setPrevImageUrl] = useState('')
    const[choose, setChoose] = useState(false)
    const[error, setError] = useState(false)

    const handleChange = (e) => {
        let files = e.target.files[0]
        setFile(files)
        const reader = new FileReader();
        reader.onload = () => {
            setPrevImageUrl(reader.result)
        }
        reader.readAsDataURL(files)
        setChoose(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', file)
        setChoose(false)
        fetch(`${url.serverUrl}/api/user/photo`,{
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
           {choose && <PhotoPreview prev={prevImageUrl}/>}
           {image !== '' && <img src={`${url.serverUrl}/static/${image}`} alt='zdjecie profilowe' style={{width: '250px'}}/>}
           <form onSubmit={handleSubmit}>
           <input type='file' onChange={(e)=>handleChange(e)}/>
           <input type='submit' value='Zapisz'/>
           </form>
           {error && <span style={{color: 'red'}}>Zdjęcie jest nie prawidłowe</span>}
       </div>
    )
}

export default AddPhoto