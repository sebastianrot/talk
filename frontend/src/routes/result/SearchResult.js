import { useState, useEffect } from "react"
import { useParams } from "react-router"
import SearchUser from "./SearchUser"
import SearchGroup from "./SearchGroup"
import Loading from "../../components/Loading"
import url from "../../components/urlSettings"

const SearchResult = ({location}) => {
    let { action } = useParams()
    const [data, setData] = useState()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/search/${action}${location.search}`)
        .then(res => res.json())
        .then(res =>{
            setData(res)
            setLoading(false)})
        .catch(err=>{
            setError(true)
            setLoading(false)})
    },[location, action])

    if(loading) return <Loading/>

    if(error) return <span>404</span>

    if(action === 'users') return <SearchUser value={data}/>

    if(action === 'groups') return <SearchGroup value={data}/>

    return(
        <section>
            404
        </section>
    )
}

export default SearchResult