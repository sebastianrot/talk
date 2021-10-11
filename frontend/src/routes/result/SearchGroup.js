import NavSearch from "./NavSearch"
import {Link} from 'react-router-dom'

const SearchGroup = ({value}) => {

    const result = value.map(val=><div key={val._id}><Link to={`/group/${val._id}`}>{val.name}</Link></div>)
    return(
        <section>
            {result}
            <NavSearch/>
        </section>
    )
}

export default SearchGroup