import React, {useState} from 'react';
import './Login.css';
import axios from "axios";
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { Wallet } from './Wallet';
import {Button, Form, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {

  const [user, setUser] = useState({});
  const [log, setLog] = useState(false);
  const [logErr, setLogErr] = useState(false);
  

  const handleChange = e => {
    setUser({...user, [e.target.name]:e.target.value});
    setLogErr(false);  
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    axios.post("http://localhost:4000/user/login", user)
      .then((response) => {
        const {token} = response.data;
        axios.post("http://localhost:4000/user/auth-user", 
          {},
          { headers: {"token": token}}
          ).then((response) => {
            setLog(true);
          }, (error) => {
            //error al postear token
            setLogErr(true);  
          });
      }, (error) => {
        //error de logeo
        setLogErr(true);        
      });

  };

  


  return (
    <>
      { log && 
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <Redirect to="/" /> <Wallet user={user}/>
            </Route>         
          </Switch>
        </BrowserRouter>

      }
      { !log && 
      <div className="App">
        <Container>
          <Form onChange={handleChange} onSubmit={handleSubmit}>
            <Row>
              <Col md>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control name="email" type="email" placeholder="ejemplo@ejemplo.com"  isInvalid={logErr}/>
              </Form.Group>
              </Col>
              <Col md>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" isInvalid={logErr}/>
              </Form.Group>
              </Col>
              
            </Row>
            {logErr && 
            <Row>  
              <Form.Text>Correo electrónico y/o contraseña no válida</Form.Text>
            </Row>}
            <Button value="Login" variant="primary" type="submit">Login</Button>
          </Form>
        </Container>
       


      </div>
    }
    </>
  );
}

export default Login;
