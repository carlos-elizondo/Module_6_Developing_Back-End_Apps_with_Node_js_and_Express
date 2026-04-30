const express = require("express");

const router = express.Router();

let friends = {
    "johnsmith@gmail.com": {
        firstName: "John",
        lastName: "Doe",
        DOB: "22-12-1990",
    },
    "annasmith@gmail.com": {
        firstName: "Anna",
        lastName: "smith",
        DOB: "02-07-1983",
    },
    "peterjones@gmail.com": {
        firstName: "Peter",
        lastName: "Jones",
        DOB: "21-03-1989",
    },
};

// GET request: Retrieve all friends
router.get("/", (req, res) => {
    // Update the code here

    res.send(`${JSON.stringify(friends, null, 4)}`); //This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email", (req, res) => {
    const email = req.params.email;
    if (email) {
        const friend = friends[email];
        if (friend) {
            res.send(`${JSON.stringify(friend)}`);
        } else {
            res.status(404).send("Friend not found");
        }
    } else {
        res.status(400).send("Missing email");
    }
});

// POST request: Add a new friend
router.post("/", (req, res) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const DOB = req.body.DOB;
    // Check if email is provided in the request body
    if (email) {
        // Create or update friend's details based on provided email
        friends[email] = {
            firstName: firstName,
            // Add similarly for lastName
            lastName: lastName,
            // Add similarly for DOB
            DOB: DOB,
        };
    }
    // Send response indicating user addition
    res.send(`The user ${firstName} ${lastName} has been added!`);
});

// PUT request: Update the details of a friend with email id
router.put("/:email", function (req, res) {
    // Extract email parameter from request URL
    const email = req.params.email;
    let friend = friends[email]; // Retrieve friend object associated with email

    if (friend) {
        // Check if friend exists
        let DOB = req.body.DOB;
        // Add similarly for firstName
        let firstName = req.body.firstName;
        // Add similarly for lastName
        let lastName = req.body.lastName;

        // Update DOB if provided in request body
        DOB && (friend["DOB"] = DOB);
        // Add similarly for firstName
        firstName && (friend["firstName"] = firstName);
        // Add similarly for lastName
        lastName && (friend["lastName"] = lastName);

        friends[email] = friend; // Update friend details in 'friends' object
        res.send(`Friend with the email ${email} updated.`);
    } else {
        // Respond if friend with specified email is not found
        res.send("Unable to find friend!");
    }
});

// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
    // Update the code here
    const email = req.params.email;
    if (email) {
        delete friends[email];
        res.send("User deleted");
    } else {
        res.status(400).send("Missing email");
    }
});

module.exports = router;
