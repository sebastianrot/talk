import './App.css';
import {AuthContextProvider} from '../context/AuthContext';
import { ProfileContextProvider } from '../context/ProfileContext';
import Navbar from './Navbar';
import Router from './Router';

const App = () => {
  return (
    <AuthContextProvider>
    <ProfileContextProvider>
    <Navbar/>
    <Router/>
    </ProfileContextProvider>
    </AuthContextProvider>
  );
}

export default App;

