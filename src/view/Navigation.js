import React from 'react';
import {Nav} from 'react-bootstrap';
import {Link, BrowserRouter as Router,NavLink} from 'react-router-dom';
import AppRouter from '../route/AppRouter.js';

const Navigation = () => {
    return(
        <Router>
            <Nav variant="pills" defaultActiveKey={window.location.pathname}>
                <Nav.Item>
                    <Nav.Link as={Link} to="/post" eventKey="/post">Post</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/get" eventKey="/get">Get</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/delete" 
                    activeStyle={{
                        backgroundColor: "red",
                        color: "white"
                    }} 
                    style={{color: "red"}}
                    eventKey="/delete" >Delete</Nav.Link>
                </Nav.Item>
            </Nav>
            <AppRouter/>
        </Router>
    );
}

export default Navigation