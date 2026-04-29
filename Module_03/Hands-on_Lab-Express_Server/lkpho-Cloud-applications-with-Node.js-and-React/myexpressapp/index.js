// Import the Express.js library
const express = require("express");

// Create an instance of an Express application
const app = new express();

app.get("/", (req, res) => {
    res.send(`
    <h1>Welcome to my App</h1>
    <p>This is HTML sent directly from index.js!</p>
  `);
});

// Start the server and listen on port 3333
app.listen(3333, () => {
    console.log(`Listening at http://localhost:3333`);
});
