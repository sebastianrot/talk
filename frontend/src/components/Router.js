import {Route, Switch} from 'react-router-dom';
import Home from '../routes/home/Home';
import Login from '../routes/login/ContentLogin';
import Register from '../routes/register/MainRegister';
import Profile from '../routes/profile/Profile';
import PostPage from './posts/PostPage';
import SearchResult from '../routes/result/SearchResult';
import Groups from '../routes/groups/Groups';
import Group from '../routes/group/Group';
import GroupMembers from '../routes/group/GroupMembers';
import GroupAccept from '../routes/group/GroupAccept';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const Router = () => {
    return(
        <Switch>
            <PrivateRoute path='/' exact component={Home}/>
            <PublicRoute path='/login' component={Login}/>
            <PublicRoute path='/register' component={Register}/>
            <Route path='/user/:username' component={Profile}/>
            <Route path='/p/:id' component={PostPage}/>
            <Route path='/search/:action' component={SearchResult}/>
            <Route path='/group/:id' exact component={Group}/>
            <PrivateRoute path='/group/:id/members' component={GroupMembers}/>
            <PrivateRoute path='/group/:id/accept' component={GroupAccept}/>
            <Route path='/groups' component={Groups}/>
            <Route render={() => <span>404</span>} />
        </Switch>
    )
}

export default Router