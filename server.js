const express = require('express');
const app = express();
const cors = require('cors');
const proxy = require('http-proxy').createProxyServer({});

app.listen(80, () => console.log('SmileCup static files on port 80.'));
app.use(cors());

app.use('/', express.static('build'));

app.use('/api/payments', (req, res, next) => {
  proxy.web(req, res, { target: 'http://localhost:8080/api/payments' }, next);
});
app.get('*', (req, res) => {
  res.sendFile('build/index.html', { root: './' });
});
