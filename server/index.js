const app = require('./app');

//start the server

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening at ${port}`);

