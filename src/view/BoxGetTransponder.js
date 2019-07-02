import React, { useState } from 'react';
import { Form, Col, Button,Alert } from 'react-bootstrap';
import axios from 'axios';


const resultHeight = {
    height:"350px"
}

const BoxGetTransponder = () => {

    const [result, setResult] = useState("result");
    const [resultStatus, setResultStatus] = useState("status");
    const BoxDbid = () => {
        const [companyId, setCompanyId] = useState("input company id");
    
        return( 
            <Form.Group sm={4} as={Col} controlId="company id">
                <Form.Group >
                    <Form.Label>Paste Company ID here</Form.Label>
                    <Form.Control type="text" defaultValue="" onChange= {event => setCompanyId(event.target.value)} placeholder="e.g: 123"/>
                </Form.Group>
                <Button  className="mx-3" variant="success" onClick={() =>{getTransponder(companyId)}}>Get List</Button>
            </Form.Group>
        );
    }
    
    const ResultArea = (props) => {
        return(
            <Form.Group as={Col} controlId="resultArea">
                <Form.Label>Transponder list</Form.Label>
                <Form.Control style={resultHeight} as="textarea" value={result}/>
                <Alert variant={ result ? "success" : "danger" } className="mt-3">
                     {resultStatus}
                </Alert>
            </Form.Group>
        )
    }
    
    const getTransponder = (companyId) => {
        axios.get('/get', {
            params: {
              ID: companyId
            }
          })
        .then(response => {
            if(response.data.status){
                setResult(formatResult(JSON.stringify(response.data.message)));
                setResultStatus(JSON.stringify(response.data.status));
            }else{
                setResult("");
                setResultStatus(JSON.stringify(response.data.message));
            }
           
          })
          .catch(error => {
            console.log(error);
          });
    }

    //format to add new line globally
    const formatResult = (result) => {
        result = result.replace(/,/g,",\n");
        result = result.replace(/{/g,"{\n");
        return result;
    }

    return(
        <Col>
            {BoxDbid()}
            {ResultArea()}
        </Col>
    );
}



export default BoxGetTransponder