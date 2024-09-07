import {Routes as Switch,Route} from 'react-router-dom'

import Layout from "./components/Layout";

import Home from './pages/Home'; 
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import { AuthContextProvider } from './context/AuthContext';
import { ToastContextProvider } from './context/ToastContext';

const App = () => {
  return (
    <ToastContextProvider>
    <AuthContextProvider>
    
  <Layout>
    <Switch>
    <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Switch>
 
    </Layout>
    
    </AuthContextProvider>
    </ToastContextProvider>
    );
}

export default App;