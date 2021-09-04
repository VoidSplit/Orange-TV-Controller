

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('views'));

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    removeHeaders: ['cookie', 'cookie2', 'origin']
}).listen(port, function() {
    console.log('Running CORS Anywhere on port : ' + port);
});

const listener = app.listen("3003", function() {
    console.log('Your app is listening on port : ' + listener.address().port);
});

