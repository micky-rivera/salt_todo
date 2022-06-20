const express = require('express');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  const root = path.join(__dirname, '..', 'client', 'build')
  app.use(express.static(root));
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
})

module.exports.app = app;
module.exports.addDetails = addDetails;
app.listen(process.env.PORT || 8080);