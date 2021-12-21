import './Search.css'
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { InputGroup, InputLeftElement, Input, useOutsideClick} from '@chakra-ui/react'
import useWindowSize from '../hook/useWindowSize'
import { FaSearch } from "react-icons/fa";
import SearchResults from './SearchResults'
import SearchMobile from './SearchMobile'
import url from '../urlSettings'

const Search = () => {
    let navigate = useNavigate()
    const [value, setValue] = useState('')
    const [results, setResults] = useState()
    const [click, setClick] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isData, setIsData] = useState(true)
    const [isStart, setIsStart] = useState(true)
    const {width} = useWindowSize()
    const ref = useRef()
    useOutsideClick({
        ref: ref,
        handler: () => setClick(false)
      })

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
            navigate(`/search/users?q=${value}`)
        }
    }

    return(
        <div className='search-box'>
        {width >= '768' ? <InputGroup size="md">
        <InputLeftElement pointerEvents="none" children={<FaSearch/>}/>
        <Input type="search" placeholder="Szukaj..." value={value} onChange={handleChange} onKeyUp={handleKey} onClick={()=>setClick(true)} />
        </InputGroup> :  <SearchMobile value={value} handleChange={handleChange} handleKey={handleKey}/>}
        {click && <div ref={ref} className='search-panel'>
        <SearchResults results={results} load={loading} isdata={isData} start={isStart}/>
        </div>}
        </div>
    )
}

export default Search