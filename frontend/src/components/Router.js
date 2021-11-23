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
import GroupAccept from '../routes/group/admin/GroupAccept';
import GroupBlock from '../routes/group/admin/GroupBlock';
import GroupPost from '../routes/grouppost/GroupPost';
import CreateGroup from '../routes/group/CreateGroup';
import Notifications from '../routes/Notifications/Notifications';
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
            <Route path='/group/:id/p/:postid' component={GroupPost}/>
            <PrivateRoute path='/group/:id/accept' component={GroupAccept}/>
            <PrivateRoute path='/group/:id/block' component={GroupBlock}/>
            <Route path='/group/:id' component={Group}/> 
            <PrivateRoute path='/groups/create' component={CreateGroup}/>
            <PrivateRoute path='/groups/discover' exact component={Groups}/>
            <PrivateRoute path='/notifications' component={Notifications}/>
            <Route render={() => <span>404</span>} />
        </Switch>
    )
}

export default Router