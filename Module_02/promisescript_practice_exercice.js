//Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
let sixSecondPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise resolved after 6 seconds.");
    }, 6000);
});

//Creating a promise method. The promise will get resolved when timer times out after 3 seconds.
function threeSecondPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise resolved after 3 seconds.");
        }, 3000);
    });
}

//Call the promise and wait for it to be resolved and then print a message.
sixSecondPromise
    .then((successMessage) => {
        console.log(successMessage);
        return threeSecondPromise();
    })
    .then((successMessage) => {
        console.log(successMessage);
    });

sixSecondPromise.then((successMessage) => {
    console.log("From Callback " + successMessage);
});

threeSecondPromise().then((successMessage) => {
    console.log("From Callback " + successMessage);
});
