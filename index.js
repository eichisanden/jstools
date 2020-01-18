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
  const content = `
  <html><body>
    <div>
    Defferent Origin
    <form action="https://jstools.herokuapp.com/headers" method="GET">
      <input type="submit" value="GET">
    </form>
    <form action="https://jstools.herokuapp.com/headers" method="POST">
      <input type="submit" value="POST">
    </form>
    <form action="https://jstools.herokuapp.com/headers" method="PUT">
      <input type="submit" value="PUT">
    </form>
    <form action="https://jstools.herokuapp.com/headers" method="DELETE">
      <input type="submit" value="DELETE">
    </form>
    </div>
    <div>
    Same Origin
    <form action="https://guarded-retreat-33096.herokuapp.com//headers" method="GET">
      <input type="submit" value="GET">
    </form>
    <form action="https://guarded-retreat-33096.herokuapp.com//headers" method="POST">
      <input type="submit" value="POST">
    </form>
    <form action="https://guarded-retreat-33096.herokuapp.com//headers" method="PUT">
      <input type="submit" value="PUT">
    </form>
    <form action="https://guarded-retreat-33096.herokuapp.com//headers" method="DELETE">
      <input type="submit" value="DELETE">
    </form>
    </div>
    </body></html>
  `
  res.send(content);
});

app.listen(process.env.PORT || 5000);

