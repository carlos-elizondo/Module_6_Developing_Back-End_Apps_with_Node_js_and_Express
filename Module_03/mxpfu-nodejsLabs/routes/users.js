const express = require("express");
const router = express.Router();

let users = [
    {
        firstName: "John",
        lastName: "wick",
        email: "johnwick@gmail.com",
        DOB: "22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email: "johnsmith@gmail.com",
        DOB: "21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email: "joyalwhite@gmail.com",
        DOB: "21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/", (req, res) => {
    res.send(users);
});

// GET by specific ID request: Retrieve a list of users with a particular lastName
router.get("/dob", (req, res) => {
    console.log("Route hit! Current users count:", users.length);
    // const dob = req.params.dob;
    // 1. Split the string by the hyphen
    // const [day, month, year] = dateString.split("-");
    // 2. Create the Date object
    // Note: Months in JS are 0-indexed (January is 0, July is 6)
    // const dateObject = new Date(year, month - 1, day);
    const dobSortedUsers = [...users];
    dobSortedUsers.sort(function (a, b) {
        a = a.DOB.split("-").reverse().join("");
        b = b.DOB.split("-").reverse().join("");
        return a > b ? 1 : a < b ? -1 : 0;
    });
    res.send(dobSortedUsers);
});

// POST request: Create a new user
router.post("/", (req, res) => {
    let userQuery = req.query;
    let user = {
        firstName: userQuery.firstName,
        lastName: userQuery.lastName,
        email: userQuery.email,
        DOB: userQuery.dob,
    };
    users.push(user);
    res.send(`The user ${userQuery.firstName} has been added!`);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email", (req, res) => {
    const email = req.params.email;
    const user = users.find((user) => user.email === email);
    if (user) {
        // If found, send the user object
        res.send(user);
    } else {
        // If NOT found, send a 404 error so the client knows what happened
        res.status(404).send({ message: "User not found" });
    }
});

// GET by specific ID request: Retrieve a list of users with a particular lastName
router.get("/lastName/:lastName", (req, res) => {
    const lastName = req.params.lastName;
    const lastNameUsers = users.filter((user) => user.lastName === lastName);
    if (lastNameUsers.length) {
        // If found, send the user object
        res.send(lastNameUsers);
    } else {
        // If NOT found, send a 404 error so the client knows what happened
        res.status(404).send({
            message: `Users with last name: ${lastName} not found`,
        });
    }
});

// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    const email = req.params.email;
    const dob = req.query.DOB;
    const userIndex = users.findIndex((u) => u.email === email);
    if (userIndex) {
        users[userIndex] = { ...users[userIndex], DOB: dob };
        // Send success message indicating the user has been updated
        res.send(`User with the email ${email} updated.`);
    } else {
        // If NOT found, send a 404 error so the client knows what happened
        res.status(404).send({ message: "User not found" });
    }
    // Copy the code here
});

// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
    const email = req.params.email;
    const user = users.find((user) => user.email === email);
    if (user) {
        users = users.filter((user) => user.email !== email);
        // Send a success message as the response, indicating the user has been deleted
        res.send(`User with the email ${email} deleted.`);
    } else {
        // If NOT found, send a 404 error so the client knows what happened
        res.status(404).send({ message: "User not found" });
    }
});

module.exports = router;
