require('dotenv').config();
const path = require('path');
const express = require('express');
const server = express();

server.use(express.json());
server.use(express.static(path.join(__dirname, 'client/build')));

console.log(process.env.NODE_ENV);

// on Heroku machine, an env variable is called "NODE_ENV" -> "Production"

if (process.env.NODE_ENV === 'development') { 
    const cors = require("cors");
    server.use(cors())
}

// Our API comes earlier in the pipeline
server.get('/api/hello', (req, res) => {
    res.json({ message: "Wassup!" })
})

// Catch-all that just sends back the index.html
server.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})