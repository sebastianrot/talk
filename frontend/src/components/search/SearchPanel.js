import './SearchPanel.css'
import SearchResults from './SearchResults'

const SearchPanel = ({results, load, isdata, start}) => {
    return(
    <section className='search-panel-section'>
        <SearchResults results={results} load={load} isdata={isdata} start={start}/>
    </section>
    )
}

export default SearchPanel