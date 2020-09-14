const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const http = require('http');

const server = http.createServer(app);

const io = require('socket.io')(server);

const { matchFinderNamespace } = require('./socketio/matchFinder.js');

matchFinderNamespace(io);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/matchFinder', (req, res) => {
    console.log(req.body);
    res.send(req.body)
});

server.listen(PORT, () => {
    console.log('API server is listening to:', PORT);
});