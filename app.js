// 127.0.0.1:3000/api/v1/tours

const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); //express.json() is a middleware(function that can modify the incoming request data, it stands b/w request and response)

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  res.send('Done');
});
const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});
