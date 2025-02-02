const dotenv = require('dotenv').config();
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const host = process.env.BACKEND_HOST;
const port = process.env.BACKEND_PORT;
const API = process.env.API_URL;
const KEY = process.env.TOKEN;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.post('/post', (req, res) => {
  const value = req.body.data;
  axios.post(API+`/api/company/transponder`
  ,value,{
    headers: {
    'Content-Type':'application/json',
    'X-Token-HHR': KEY
    },
    timeout: 10000
  })
  .then(response => {
    res.send(response.data);
  })
  .catch(error => {
    res.send(error);
  });
});

app.get('/get', (req, res) => {
  const value = req.query.ID;
  axios.get(API+`/api/company/${value}/transponder`
  ,{
    headers: {
    'X-Token-HHR': KEY
    },
    timeout: 10000
  })
  .then(response => {
    res.send(response.data);
  })
  .catch(error => {
    res.send(error);
  });
});

app.get('/delete', (req,res) => {
  const companyId = req.query.companyId;
  const chipId = req.query.chipId ? req.query.chipId : 0;
  axios.delete(API+`/api/company/${companyId}/transponder/${chipId}`
  ,{
    headers: {
    'X-Token-HHR': KEY
    },
    timeout: 10000
  })
  .then(response => {
    res.send(response.data);
  })
  .catch(error => {
    res.send(error);
  });
});

app.listen(port, host, ()=>{
   console.log("Server is running on %s:%s", host, port);
});