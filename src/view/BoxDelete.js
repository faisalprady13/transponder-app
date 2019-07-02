import React, {useState} from 'react';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const BoxDelete = () => {
    const [resultStatus, setResultStatus] = useState("status");
    const [alert, setAlert] = useState(false);

    const BoxDbid = () => {
        const [companyId, setCompanyId] = useState("input company id");
        const [firstId, setFirstId] = useState("first");
        const [lastId, setLastId] = useState("last");

        return( 
            <Form.Group lg={4} as={Col} controlId="company id">
                <Form.Group >
                    <Form.Label>fill 'start' for delete 1 transponder</Form.Label>
                    <Form.Control type="text" defaultValue="" onChange= {event => setCompanyId(event.target.value)} placeholder="e.g: 123"/>
                    <Form.Row className="mt-2">
                        <Form.Group as={Col} lg={6}>
                            <Form.Control type="text" defaultValue="" onChange= {event => setFirstId(event.target.value)} placeholder="start"/>
                        </Form.Group>
                        <Form.Group as={Col} lg={6}>
                            <Form.Control type="text" defaultValue="" onChange= {event => setLastId(event.target.value)} placeholder="end"/>
                        </Form.Group>
                    </Form.Row>
                    <Alert variant={ alert ? "success" : "danger" } className="my-3">
                        {resultStatus}
                    </Alert>
                </Form.Group>
                <Button  className="mx-2" variant="danger" onClick={() =>{deleteAll(companyId,firstId,lastId)}}>Delete Transponder</Button>
            </Form.Group>
        );
    }

    const deleteAll = (dbId,start=0,end=0) => {
        if(start<end){
            for(var i = start; i<=end; i++){
                deleteTransponder(dbId,i);
            }
        }else{
            deleteTransponder(dbId,start);
        }
    }

    const deleteTransponder = (dbId=0,chipId=0) => {
        axios.get('/delete', {
            params: {
                companyId: dbId,
                chipId: chipId
            }
          })
        .then(response => {
            console.log(response);
            if(response.data.status){
                setResultStatus(JSON.stringify(response.data.status));
                setAlert(true);
            }else{
                setResultStatus(JSON.stringify(response.data.message));
                setAlert(false);
            }
        })
        .catch(error => {
            setResultStatus(JSON.stringify(error.message));
            setAlert(false);
            console.log(error);
        });
    }

    return(
        <Col>
            <Alert variant="danger" className="my-3">
                DANGER !!
            </Alert>
            <BoxDbid/>
        </Col>
    );
}

export default BoxDelete