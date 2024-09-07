import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import ToastContext from '../context/ToastContext';

const Login = () =>{
  const {toast} = useContext(ToastContext);
    const {loginUser} = useContext(AuthContext)
    const [credentials,setCredentials] = useState({
        email:"",
        password:"",
    });


    const handleInputChange = (event)=>{
        const {name,value} = event.target;

        setCredentials({...credentials,[name]:value})
    };

    const handleSubmit = (event)=>{
        event.preventDefault();

        toast.success("Logging In the User");

        if(!credentials.email || !credentials.password){
            toast.error("Please enter all the required fields");
            return;

        }
        loginUser(credentials);
    }
    return <>
  
    <h1>Login</h1>
    <br />
    <Form onSubmit={handleSubmit}>
   
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        type="email"
         name="email" 
         value={credentials.email} 
         placeholder="Enter email"
         onChange={handleInputChange}
         required
         />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
         type="password" 
         name="password" 
         value={credentials.password} 
         placeholder="Password"
         onChange={handleInputChange}
         required
         />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Login
      </Button>
      <p>Don't have an account? <Link to="/register">Create One</Link></p>
    </Form>
    </>
}

export default Login;