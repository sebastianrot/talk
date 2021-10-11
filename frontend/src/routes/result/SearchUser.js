import NavSearch from "./NavSearch"
import {Link} from 'react-router-dom'

const SearchUser = ({value}) => {

    const result = value.map(val=><div key={val._id}><Link to={`/user/${val.username}`}>{val.username}</Link></div>)
    return(
        <section>
            {result}
            <NavSearch/>
        </section>
    )
}

export default SearchUser