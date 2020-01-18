"use strict";

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

const woothee = require('woothee');

app.get('/api/ua', (req, res) => {
  const q = req.query.q;
  res.send(woothee.parse(q));
})

app.all('/headers', (req, res) => {
  return res.send(JSON.stringify(req.headers));
});

app.get('/form', (req, res) => {
  res.set('Content-Type', "text/html; charset=UTF-8");
  res.send('<html><body><form action="https://jstools.herokuapp.com/headers" method="POST"><input type="submit" value="Submit"></form></body></html>');
});

app.listen(process.env.PORT || 5000);

