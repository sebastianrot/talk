import {Routes, Route} from 'react-router-dom';
import Hot from '../routes/home/Hot';
import Best from '../routes/home/Best';
import Login from '../routes/login/ContentLogin';
import Register from '../routes/register/MainRegister';
import Profile from '../routes/profile/Profile';
import PostPage from './posts/PostPage';
import SearchResultsPage from '../routes/result/SearchResultsPage';
import Groups from '../routes/groups/Groups';
import Group from '../routes/group/Group';
import CreateGroup from '../routes/group/CreateGroup';
import Notifications from '../routes/notifications/Notifications';
import Author from '../routes/author/Author';
import Contact from '../routes/contact/Contact';
import Privacy from '../routes/privacy/Privacy';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const Router = () => {
    return(
        <main style={{flex: '1 auto'}}>
        <Routes>
            <Route path={`/home`} element={<PrivateRoute><Hot/></PrivateRoute>}/>
            <Route path={`/hot`} element={<PrivateRoute><Hot/></PrivateRoute>}/>
            <Route path='/best' element={<PrivateRoute><Best/></PrivateRoute>}/>
            <Route path={'/'} element={<PublicRoute><Login/></PublicRoute>}/>
            <Route path={'/login'} element={<PublicRoute><Login/></PublicRoute>}/>
            <Route path='/register' element={<PublicRoute><Register/></PublicRoute>}/>
            <Route path='/user/:username/*' element={<Profile/>}/>
            <Route path='/p/:id' element={<PostPage/>}/>
            <Route path='/search/:action' element={<SearchResultsPage/>}/>
            <Route path='/group/:id/*' element={<Group/>}/> 
            <Route path='/groups/create' element={<PrivateRoute><CreateGroup/></PrivateRoute>}/>
            <Route path='/groups/discover' element={<PrivateRoute><Groups/></PrivateRoute>}/>
            <Route path='/notifications' element={<PrivateRoute><Notifications/></PrivateRoute>}/>
            <Route path='/author' element={<Author/>}/> 
            <Route path='/contact' element={<Contact/>}/> 
            <Route path='/privacy' element={<Privacy/>}/> 
            <Route path='*' element={<span>404</span>} />
        </Routes>
        </main>
    )
}

export default Router