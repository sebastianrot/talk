import './SearchResults.css'
import {Link} from 'react-router-dom'
import Loading from '../Loading'

const SearchResults = ({results, load, isdata, start}) => {

    if(start) return(
        <span>Wyszukaj użytkownika albo grupe</span>
    )

    if(load) return <Loading/>

    if(!isdata) return(
    <span>brak wyników</span>
    )

    let result = results.map((data)=> (
    <div className='search-result' key={data._id}>
        <Link to={`/user/${data.username}`}>{data.username}</Link>
    </div>
    ))

    return(
        <>
            {result}
        </>
    )
}

export default SearchResults