import React, { Component } from 'react';
import { Form, Col, Button,Alert,Container } from 'react-bootstrap';
import axios from 'axios';

const resultHeight = {
    height:"350px"
}

const height = {
    height:"300px"
}

//normal class structure with construction and function
class BoxInput extends Component{
    constructor(props) {
        super(props);
        this.state = {
            companyId: '',
            uuId: '',
            transponderList: '',
            resultJson:'',
            resultAmount: '',
            resultStatus:'status',
            showResults:false
        };
    }

    render(){
        return (
            <Form>
                <Form.Row as={Container} fluid>
                    <Form.Group as={Col} lg={6}>
                        <Form.Row className="mx-2">
                                {this.boxDbid()}
                                {this.boxUuid()}
                        </Form.Row>
                        {this.boxTransponderList()}
                        {this.generateButton(this.state)}
                    </Form.Group>
                    <Form.Group as={Col} lg={6}>
                        {this.resultArea()}
                        {this.submitButton()}
                    </Form.Group>
                </Form.Row>
            </Form>
        )
    }

    //is responsible to update state when field changed (custom field name)
    onFieldChange = field => ({ target }) => 
    this.setState({
         [field]: target.value
        } );

    //function dbid
    boxDbid = () => {
        return( 
            <Form.Group sm={4} as={Col} controlId="company id">
                <Form.Label>Paste Company ID here</Form.Label>
                <Form.Control type="text" value={this.state.companyId} onChange= {this.onFieldChange('companyId')} placeholder="e.g: 123"/>
            </Form.Group>
        )
    }

    //function uuid
    boxUuid = () => {
        return(
            <Form.Group as={Col} controlId="uuid">
                <Form.Label>Paste UUID here</Form.Label>
                <Form.Control type="text" value={this.state.uuId} onChange={this.onFieldChange('uuId')} placeholder="e.g: 09a26154-18da-4ec0-a287-d8bea629430e"/>
            </Form.Group>
        )
    } 

    //function transponder list
    boxTransponderList = () => {
        return(
            <Form.Group as={Col} controlId="transponder id">
                <Form.Label>Paste all Chip-ID and Transponder-ID here:</Form.Label>
                <Form.Control as="textarea" style={height} value={this.state.transponderList} onChange={this.onFieldChange('transponderList')} placeholder="
                    101 277854088
                    102 277857993
                    103 277851256 etc..."/>
            </Form.Group>
        )
    }

    //function generate button with parameter 'value'
    generateButton = (value) => {
        return(
            <Col>
                <Button className="mx-3" variant="warning" onClick={() =>{this.buildQuery(value.companyId,value.uuId,value.transponderList)}}>
                        Chip
                </Button>
                <Button className="mx-3" variant="success" onClick={() =>{this.buildFingerQuery(value.companyId,value.uuId,value.transponderList)}}>
                        Fingerprint
                </Button>
            </Col>
        )
    }

    submitButton = (value) => {
        return(
            <Button className="mx-3" variant="primary" onClick={this.postTransponder}>
                    Submit
            </Button>
        )
    }

    resultArea = () => {
        return(
            <Form.Group as={Col} controlId="resultArea">
                <Form.Label>Created transponder {this.state.resultAmount}</Form.Label>
                <Form.Control style={resultHeight} as="textarea" value={this.state.resultJson}/>
                <Alert variant={ this.state.showResults ? "success" : "danger" } className="mt-3">
                     {this.state.resultStatus}
                </Alert>
            </Form.Group>
        )
    }



    postTransponder = () => {
        const data = this.state.resultJson;
        axios.post(`/post`, {
            data
        })
        .then(response => {
            if(response.data.status){
                this.setState({
                    resultStatus: JSON.stringify(response.data.message),
                    showResults: true
                });
            }else{
                this.setState({
                    resultStatus: JSON.stringify(response.data.message),
                    showResults: false
                });
            }
          })
          .catch(error => {
            this.setState({
                showResults: false
            });
            console.log(error);
          });
    }

    buildQuery =(_companyid,_uuid,_transponderid) => {
        var amount = 0;
        var heavenhr_id = [];
        var transponder_id = [];
        var company_id = _companyid;
        var uuid = _uuid;
        var result = "";
        var bunch_of_ids = _transponderid;
        var temp_array = bunch_of_ids.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
  
        var query_stub1="{'id': ";
        var query_stub2=", 'vendor_id': '";
        var query_stub3="', 'company_uuid': '";
        var query_stub4="', 'company_id': ";
        var query_stub5=", 'creation_date': '"
        var query_stub6="', 'update_date': '"
        var query_stub7="'}"
  
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
  
        //if (dd<10) { dd = '0'+ dd }
        //if (mm<10) { mm = '0'+ mm }
        today = yyyy + "-" + mm + "-" + dd;
  
        for (var x = 0; x < temp_array.length; x++) {
          if (temp_array[x].length >= 9) {
            transponder_id.push(temp_array[x]);
          } else {
            heavenhr_id.push(temp_array[x]);
          }
        }
        amount = heavenhr_id.length;
  
        result = "{\n\"values\": \"[";
        for(var i = 0; i < amount; i++) {
          result += query_stub1 + heavenhr_id[i] + query_stub2 + transponder_id[i] +
          query_stub3 + uuid + query_stub4 + company_id + query_stub5 + today +
          query_stub6 + today + query_stub7;
          if (i !== (amount-1))
            result += ","
        }
        result += "];\"\n}";

        this.setState({
            resultAmount: amount,
            resultJson: result
        } );
    }

    buildFingerQuery = (_companyid,_uuid,_transponderid) => {
        
        var amount = 0;
        var heavenhr_id = [];
        var transponder_id = [];
        var company_id = _companyid;
        var uuid = _uuid;
        var result = "";
        var bunch_of_ids = _transponderid;
        var temp_array = bunch_of_ids.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );

        var query_stub1="{'id': ";
        var query_stub2=", 'vendor_id': '";
        var query_stub3="', 'company_uuid': '";
        var query_stub4="', 'company_id': ";
        var query_stub5=", 'creation_date': '"
        var query_stub6="', 'update_date': '"
        var query_stub7="'}"

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        //if (dd<10) { dd = '0'+ dd }
        //if (mm<10) { mm = '0'+ mm }
        today = yyyy + "-" + mm + "-" + dd;

        for (var x = 0; x < temp_array.length; x++) {
            heavenhr_id.push(temp_array[x]);
            transponder_id.push(temp_array[x]);
        }
        amount = heavenhr_id.length;
        console.log(heavenhr_id);
        console.log(transponder_id);

        result = "{\n\"values\": \"[";
        for(var i = 0; i < amount; i++) {
        result += query_stub1 + heavenhr_id[i] + query_stub2 + transponder_id[i] +
        query_stub3 + uuid + query_stub4 + company_id + query_stub5 + today +
        query_stub6 + today + query_stub7;
        if (i !== (amount-1))
            result += ","
        }
        result += "];\"\n}";
        this.setState({
            resultAmount: amount,
            resultJson: result
        } );
    }
}

export default BoxInput