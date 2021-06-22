import { useState } from "react"
import url from "../../components/urlSettings"

const AddPhoto = () => {

    const[file, setFile] = useState('')
    const[image, setImage] = useState('')
    const[prevImageUrl, setPrevImageUrl] = useState('')
    const[error, setError] = useState(false)

    const handleChange = (e) => {
        let files = e.target.files[0]
        setFile(files)
        const reader = new FileReader();
        reader.onload = () => {
            setPrevImageUrl(reader.result)
        }
        reader.readAsDataURL(files)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', file)

        fetch(`${url.serverUrl}/api/addphoto`,{
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
           <form onSubmit={handleSubmit}>
           <input type='file' onChange={(e)=>handleChange(e)}/>
           <input type='submit' value='Wyślij'/>
           </form>
           {image !== '' ? <img src={`${url.serverUrl}/static/profile/${image}`} alt='zdjecie profilowe'/> : null}
           {prevImageUrl !== '' ? <img src={prevImageUrl} alt='zdjecie profilowe'/> : null}
           {error ? <span>Zdjęcie jest nie prawidłowe</span> : null}
       </div>
    )
}

export default AddPhoto