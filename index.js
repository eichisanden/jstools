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
  res.header('Access-Control-Allow-Origin', 'https://guarded-retreat-33096.herokuapp.com');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  return res.send(JSON.stringify(req.headers));
});

app.get('/form', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://guarded-retreat-33096.herokuapp.com');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
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
    </div>
    <div>
    Same Origin
    <form action="https://guarded-retreat-33096.herokuapp.com/headers" method="GET">
      <input type="submit" value="GET">
    </form>
    <form action="https://guarded-retreat-33096.herokuapp.com/headers" method="POST">
      <input type="submit" value="POST">
    </form>
    </div>
    <div>
    Same Origin(localhost)
    <form action="http://localhost:5000/headers" method="GET">
      <input type="submit" value="GET">
    </form>
    <form action="http://localhost:5000/headers" method="POST">
      <input type="submit" value="POST">
    </form>
    </div>
    <div>
    Ajax Same Origin POST
    <input type="button" value="POST" onClick="ajaxSend('https://guarded-retreat-33096.herokuapp.com/headers', 'message1', 'POST')">
    <div id="message1"></div>
    </div>
    <div>
    Ajax Cross Origin POST
    <input type="button" value="POST" onClick="ajaxSend('https://jstools.herokuapp.com/headers', 'message2', 'POST')">
    <div id="message2"></div>
    </div>
    <div>
    Ajax Same Origin(localhost) POST
    <input type="button" value="POST" onClick="ajaxSend('http://localhost:5000/headers', 'message3', 'POST')">
    <div id="message3"></div>
    </div>

    <div>
    Ajax Same Origin GET
    <input type="button" value="GET" onClick="ajaxSend('https://guarded-retreat-33096.herokuapp.com/headers', 'message4', 'GET')">
    <div id="message4"></div>
    </div>
    <div>
    Ajax Cross Origin GET
    <input type="button" value="GET" onClick="ajaxSend('https://jstools.herokuapp.com/headers', 'message5', 'GET')">
    <div id="message5"></div>
    </div>
    <div>
    Ajax Same Origin(localhost) GET
    <input type="button" value="GET" onClick="ajaxSend('http://localhost:5000/headers', 'message6', 'GET')">
    <div id="message6"></div>
    </div>
    <script>
    function ajaxSend(uri, divId, method) {
      const elm = document.getElementById(divId);
      elm.innerText = "loading..."; 
      fetch(uri, {method:method, mode:"cors"})
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        elm.innerText = JSON.stringify(myJson);
      });
    }
    </script>
    </body></html>
  `
  res.send(content);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://guarded-retreat-33096.herokuapp.com');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);

  if ('OPTIONS' == req.method) {
    res.send(204); // 204: No Content
  } else {
    next();
  }
});

app.listen(process.env.PORT || 5000);

