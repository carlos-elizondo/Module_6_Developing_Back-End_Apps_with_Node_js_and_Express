// Import the HTTP module
const http = require("http");

// Import the 'today' module
const today = require("./today");

// Define the request listener function
const requestListener = function (req, res) {
    res.writeHead(200); // Set the status code to 200 (OK)
    // Send the response with the current date from the 'today' module
    const date = new Date();
    const year = date.getFullYear();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const month = date.getMonth();
    const day = date.getDate();
    const time = date.getHours();
    let message = "";
    if (time > 5 && time < 12) {
        message = `Hello, good morning! The date today is ${month} ${day} ${year}`;
    } else if (time > 12 && time < 18) {
        message = `Hello, good afternoon! The date today is ${months[month]} ${day} ${year}`;
    } else if (time > 18 && time < 21) {
        message = `Hello, good evening! The date today is ${months[month]} ${day} ${year}`;
    } else if (time > 21 && time < 24) {
        message = `Hello, good night! The date today is ${month} ${day} ${year}`;
    } else {
        message = `Better go to bed! The date today is ${month} ${day} ${year}`;
    }
    res.end(message);
};

// Define the port number
const port = 8080;

// Create an HTTP server using the request listener function
const server = http.createServer(requestListener);

// Start the server and listen on the specified port
server.listen(port);
console.log("Server listening on port: " + port);
