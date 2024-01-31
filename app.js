const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'Natours' });
  //send can be used to send data
  //json allows to send data in json object, automatically set the content type to application/json
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});
