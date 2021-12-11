import {Route, Switch} from 'react-router-dom';
import Home from '../routes/home/Home';
import Login from '../routes/login/ContentLogin';
import Register from '../routes/register/MainRegister';
import Profile from '../routes/profile/Profile';
import PostPage from './posts/PostPage';
import SearchResultsPage from '../routes/result/SearchResultsPage';
import Groups from '../routes/groups/Groups';
import Group from '../routes/group/Group';
import GroupPost from '../routes/grouppost/GroupPost';
import CreateGroup from '../routes/group/CreateGroup';
import Notifications from '../routes/Notifications/Notifications';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const Router = () => {
    return(
        <main style={{flex: '1 auto'}}>
        <Switch>
            <PrivateRoute path='/home' exact component={Home}/>
            <PublicRoute path={['/', '/login']} exact component={Login}/>
            <PublicRoute path='/register' component={Register}/>
            <Route path='/user/:username' component={Profile}/>
            <Route path='/p/:id' component={PostPage}/>
            <Route path='/search/:action' component={SearchResultsPage}/>
            <Route path='/group/:id/p/:postid' component={GroupPost}/>
            <Route path='/group/:id' component={Group}/> 
            <PrivateRoute path='/groups/create' component={CreateGroup}/>
            <PrivateRoute path='/groups/discover' exact component={Groups}/>
            <PrivateRoute path='/notifications' component={Notifications}/>
            <Route render={() => <span>404</span>} />
        </Switch>
        </main>
    )
}

export default Router