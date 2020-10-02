const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Node.js web server at port ${PORT} is running...`);
});
