import { useHistory, useLocation } from "react-router"

const NavSearch = () => {
    let history = useHistory()
    const location = useLocation()
    return(
        <article>
            <button onClick={()=>history.push(`/search/users${location.search}`)}>Użytkownicy</button>
            <button onClick={()=>history.push(`/search/groups${location.search}`)}>Grupy</button>
        </article>
    )
}

export default NavSearch