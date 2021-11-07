import { useState } from "react"
import url from "../../components/urlSettings"


const GroupPostAdd = ({id}) => {
    const [text, setText] = useState('')
    const[file, setFile] = useState([])
    const[image, setImage] = useState('')
    const[prevImageUrl, setPrevImageUrl] = useState([])
    const[choose, setChoose] = useState(false)
    const[error, setError] = useState(false)

    const handleChange = (e) => {
        let files = e.target.files[0]
        if(file.length < 4) {
        setFile(prev=> [...prev, files])
        const reader = new FileReader();
        reader.onload = () => {
            setPrevImageUrl(prev=>[...prev, reader.result])
        }
        reader.readAsDataURL(files)
        setChoose(true)
        }   
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        file.forEach(val => {
            formData.append('images', val)
        })
        formData.set('text', text)
        setChoose(false)
        fetch(`${url.serverUrl}/api/group/${id}/post`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData
        }).then(res=> res.json())
        .then(data=> {
            setError(false)
            setImage(data.path)
        })
        .catch(err=> {
            setError(true)
        })
    }
    const prev = prevImageUrl.map(val=> <img src={val} alt='zdjęcie'/>)
    return(
        <div>
            {choose && prev}
            <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Napisz' onChange={e=>setText(e.target.value)} value={text}/>
            <div className='div-upload-file'>
            <input type='file' placeholder='upload' id='file' className='post-file' onChange={(e)=>handleChange(e)}/>
            <label htmlFor='file'>Wybierz plik</label>
            </div>
           <input type='submit' value='Wyślij'/>
           </form>
           {error && <span style={{color: 'red'}}>Zdjęcia są nie prawidłowe</span>}
        </div>
    )
}

export default GroupPostAdd