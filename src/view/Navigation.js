import React from 'react';
import {Nav} from 'react-bootstrap';
import {Link, BrowserRouter as Router} from 'react-router-dom';
import AppRouter from '../route/AppRouter.js';

    //TODO: pisah route, pake on select di nav bootstrap react

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
            </Nav>
            <AppRouter/>
        </Router>
    );
}

export default Navigation