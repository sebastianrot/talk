import { useState } from "react"
import { InputGroup, Input, InputRightElement, IconButton } from "@chakra-ui/react"
import { FaPaperclip, FaPaperPlane } from "react-icons/fa"
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
        setText('')
        setFile([])
        setPrevImageUrl([])
    }
    const prev = prevImageUrl.map(val=> <img src={val} alt='zdjęcie'/>)
    return(
        <div style={{padding: '5px 15px'}}>
        <form onSubmit={handleSubmit} style={{display: 'flex'}}>
        <InputGroup>
        <Input type='text' placeholder='Napisz' borderLeftRadius='18px' borderRightRadius='0px' onChange={e=>setText(e.target.value)} value={text}/>
        <InputRightElement children={
            <label htmlFor='file-post'>
            <FaPaperclip fontSize='18px'/>
            </label>} />
        </InputGroup>
        <div className='div-upload-file'>
        <input type='file' placeholder='upload' id='file-post' className='post-file' onChange={(e)=>handleChange(e)}/>
        </div>
        <IconButton type='submit' icon={<FaPaperPlane/>} borderRightRadius='18px' borderLeftRadius='0px'/>
       </form>
       {error && <span style={{color: 'red'}}>Zdjęcia są nie prawidłowe</span>}
       {choose && prev}
    </div>
    )
}

export default GroupPostAdd


