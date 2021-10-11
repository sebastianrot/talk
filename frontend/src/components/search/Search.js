import { useState, useEffect } from "react"
import { useHistory } from "react-router"
import './Search.css'
import url from '../urlSettings'
import SearchPanel from './SearchPanel'

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

    return(
        <div className='search-box'>
        <input type='search' placeholder='Search...' className='search' value={value} onChange={handleChange} onFocus={()=>setClick(true)} onBlur={()=>setTimeout(()=>setClick(false), 300)}/>
        <button onClick={()=>history.push(`/search/users?q=${value}`)}>Wyszukaj</button>
        {click && <SearchPanel results={results} load={loading} isdata={isData} start={isStart}/>}
        </div>
    )
}

export default Search