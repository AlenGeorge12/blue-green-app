const express = require('express');
const app = express();
const port = 3000;

const version = "Blue"; // This is the initial version

app.get('/', (req, res) => {
  res.send(`<html><body style="background-color:${version.toLowerCase()}; color:white; font-family:sans-serif; text-align:center;"><h1>Hello from the ${version} Version!</h1></body></html>`);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
