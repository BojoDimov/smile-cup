const express = require('express');
const app = express();
const cors = require('cors');


console.log(process.argv);
app.listen(8081, () => console.log('SmileCup static files on port 80.'));
app.use(cors());

app.use('/', express.static('build'));
app.get('*', (req, res) => {
  res.sendFile('build/index.html', { root: './' });
});
