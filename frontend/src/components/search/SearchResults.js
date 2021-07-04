import './SearchResults.css'
import {Link} from 'react-router-dom'
import Loading from '../Loading'

const SearchResults = ({results, load, isdata}) => {

    if(load) return <Loading/>

    if(!isdata) return(
    <div className='search-results'>
    <span>brak wyników</span>
    </div>
    )

    let result = results.map((data)=> (
    <div className='search-result'>
        <Link to={`/user/${data.username}`}>{data.username}</Link>
    </div>
    ))

    return(
        <div className='search-results'>
            {result}
        </div>
    )
}

export default SearchResults