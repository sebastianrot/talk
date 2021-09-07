import './AddPosts.css'
import { useState, useEffect } from "react"
import PhotoPreview from './PhotoPreview'
import url from "../../components/urlSettings"

const AddPosts = () => {

    const [value, setValue] = useState('')
    const [file, setFile] = useState([])
    const[prevImageUrl, setPrevImageUrl] = useState([])
    const [choose, setChoose] = useState()
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        let files = e.target.files
        if(file.length < 4) {
        setFile(prev=> [...prev, ...files])
        setPrevImageUrl([])
        }
    }

    const handleClick = () => {
        console.log(file)
        const formData = new FormData()
        file.forEach(val => {
        formData.append('images', val)
    })
    formData.set('text', value)
        setChoose(false)

        fetch(`${url.serverUrl}/api/addposts`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData
        })
        .catch(err => setError(true))
        setValue('')
    }

    useEffect(() => {
        if(prevImageUrl.length < 4) {
        file.forEach(value => {
            const reader = new FileReader();
            reader.onload = () => {
                setPrevImageUrl(prev=> [...prev, reader.result])
            }
            reader.readAsDataURL(value)
        })
    }
        setChoose(true)

    },[file])

    console.log(file)
    console.log(prevImageUrl)
    const prew = prevImageUrl.map((url, i) => <PhotoPreview prev={url} id={file[i]}/>)
    return(
        <div>
        <input type='text' placeholder='Co słychać?' onChange={(e)=> setValue(e.target.value)} value={value}/>
        <div className='div-photos-prev'>
        {choose && prew}
        </div>
        {error && <span>błąd</span>}
        <div className='div-upload-file'>
        <input type='file' placeholder='upload' id='file' className='post-file' onChange={(e)=>handleChange(e)}/>
        <label htmlFor='file'>Wybierz plik</label>
        </div>
        <button onClick={handleClick}>Opublikuj</button>
        </div>
    )
}

export default AddPosts