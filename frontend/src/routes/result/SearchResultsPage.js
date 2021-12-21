import { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import SearchUsersPage from "./SearchUsersPage"
import SearchGroupsPage from "./SearchGroupsPage"
import Loading from "../../components/Loading"
import url from "../../components/urlSettings"

const SearchResultsPage = () => {
    let { action } = useParams()
    const location = useLocation()
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

    if(action === 'users') return <SearchUsersPage value={data}/>

    if(action === 'groups') return <SearchGroupsPage value={data}/>

    return(
        <section>
            404
        </section>
    )
}

export default SearchResultsPage