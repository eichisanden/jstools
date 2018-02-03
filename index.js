"use strict";

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
})

const woothee = require('woothee');

app.get('/api/ua', (req, res) => {
  const q = req.query.q;
  res.send(woothee.parse(q));
})

app.listen(process.env.PORT || 5000);

