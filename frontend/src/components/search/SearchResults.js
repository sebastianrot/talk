import SearchResult from './SearchResult'
import Loading from '../Loading'

const SearchResults = ({results, load, isdata, start}) => {
    
    if(start) return(
        <div style={{padding: '5px 0px 10px 6px', width: '100%'}}><span style={{fontWeight: '600'}}>Wyszukaj użytkownika albo grupe</span></div>
    )

    if(load) return <Loading/>

    if(!isdata) return(
        <div style={{padding: '5px 0px 10px 6px', width: '100%'}}><span style={{fontWeight: '600'}}>Brak wyników</span></div>
    )

    let result = results.map((data)=> (
    <SearchResult val={data} key={data._id}/>
    ))

    return(
        <>
            {result}
        </>
    )
}

export default SearchResults