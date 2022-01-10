import { Routes, Route } from "react-router-dom"
import SearchUsersPage from "./SearchUsersPage"
import SearchGroupsPage from "./SearchGroupsPage"

const SearchResultsPage = () => {
    return(
        <section>
        <Routes>
            <Route path={`/users`} element={<SearchUsersPage/>}/>
            <Route path={`/groups`} element={<SearchGroupsPage/>}/>
            <Route path='*' element={<span>404</span>} />
        </Routes>
        </section>
    )
}

export default SearchResultsPage