import './Search.css'
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { InputGroup, InputLeftElement, Input} from '@chakra-ui/input'
import { FaSearch } from "react-icons/fa";
import SearchPanel from './SearchPanel'
import url from '../urlSettings'

const Search = () => {
    let history = useHistory();
    const [value, setValue] = useState('')
    const [results, setResults] = useState()
    const [click, setClick] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isData, setIsData] = useState(true)
    const [isStart, setIsStart] = useState(true)

    useEffect(()=>{
        if(value.length > 0) {
            setIsStart(false)
        fetch(`${url.serverUrl}/api/search?q=${value}`)
        .then(res => res.json())
        .then(data => {
            if(data.length === 0) {
            setIsData(false)
            }else {
            setResults(data)
            setIsData(true)
            }
            setLoading(false)
        })
        .catch(err => {
            setIsData(false)
            setLoading(false)
        })
        } else {
            setIsStart(true)
        }
    },[value])

    const handleChange = (e) => {
        let text = e.target.value
        let string = text.toLowerCase().trim()
        setValue(string)
    }

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            history.push(`/search/users?q=${value}`)
        }
    }

    return(
        <div className='search-box'>
        <InputGroup size="md">
        <InputLeftElement pointerEvents="none" children={<FaSearch/>}/>
        <Input type="search" placeholder="Szukaj..." value={value} onChange={handleChange} onKeyUp={handleKey} onFocus={()=>setClick(true)} onBlur={()=>setTimeout(()=>setClick(false), 300)} />
        </InputGroup>
        {click && <SearchPanel results={results} load={loading} isdata={isData} start={isStart}/>}
        </div>
    )
}

export default Search