import {Routes as Switch,Route} from 'react-router-dom'

import Layout from "./components/Layout";

import Home from './pages/Home'; 
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import { AuthContextProvider } from './context/AuthContext';
import { ToastContextProvider } from './context/ToastContext';
import CodeAnalyzer from './pages/CodeAnalyzer';
import ManageRules from './pages/ManageRules';
import OutputAnalysis from './pages/OutputAnalysis';

const App = () => {
  return (
    <ToastContextProvider>
    <AuthContextProvider>
    
  <Layout>
    <Switch>
    <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/code-analyzer" element={<CodeAnalyzer/>}/>
        <Route path="/manage-rules" element={<ManageRules />} />
        <Route path="/manage-output" element={<OutputAnalysis />} />
      
    </Switch>
 
    </Layout>
    
    </AuthContextProvider>
    </ToastContextProvider>
    );
}

export default App;