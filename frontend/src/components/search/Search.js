import { useState, useEffect } from "react"
import './Search.css'
import url from '../urlSettings'
import SearchResults from "./SearchResults"

const Search = () => {

    const [value, setValue] = useState('')
    const [results, setResults] = useState()
    const [click, setClick] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isData, setIsData] = useState(true)

    useEffect(()=>{
        if(value.length > 0) {
        setClick(true)
        fetch(`${url.serverUrl}/api/search?queries=${value}`)
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
            setClick(false)
        }
    },[value])

    const handleChange = (e) => {
        let text = e.target.value
        let string = text.toLowerCase().trim()
        setValue(string)
    }

    return(
        <div className='search-box'>
        <input type='search' placeholder='Search...' className='search' value={value} onChange={handleChange} />
        {click ? <SearchResults results={results} load={loading} isdata={isData} /> : null}
        </div>
    )
}

export default Search