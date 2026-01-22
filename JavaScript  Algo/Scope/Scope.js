// // What will console log?
// // Will there be an error?
// // Why?
// // Will something be undefined?
// // Why?
// // To what scope does each variable belong?
// // Global or local? If local, to which specifically?
// // If anything is unclear, make sure to ask.

// /* ---------------------------- Scope exercise 1 ---------------------- */

// const run = true

// if (run) {
//     let distance = 8
//     for (var i = 0; i < distance; i++) {
//         console.log("running")
//     }
//     console.log("Finished running " + distance + " miles")
// }

// console.log("Damn, you see this gal? She ran " + distance + " miles") 

// // What will console log? 
//     // running (8 times)
//     // Finished running 8 miles

// // Will there be an error? yes
//     //console.log("Damn, you see this gal? She ran " + distance + " miles")
//     //ReferenceError: distance is not defined
// // Why?
//     //Because distance was defined with let inside the if block 


// // Will something be undefined?No

// // Why? ReferenceError

// // To what scope does each variable belong?

//     //run is global
//     //distance is local to the if block
//     //i is local to the for block

// // Global or local? If local, to which specifically?

//     //run is global
//     //distance is local to the if block
//     //i is local to the for block

    
// /* ---------------------------- Scope exercise 2 ---------------------- */

// if (13 == "space") {
//     let cowSound = "moo"
// }
// else {
//     console.log("Cow says " + cowSound)
// }
// // What will console log? Nothing
// // Will there be an error? Yes
//     //ReferenceError: cowSound is not defined
// // Why?
//     //Because cowSound was defined with let inside the if block
// // Will something be undefined?No
// // Why?
//     //cowSound is not declared in the else scope or globally; it only exists inside the if block.
// // To what scope does each variable belong?
// // Global or local? If local, to which specifically?cowSound
//     //cowSound is local, specifically block-scoped to the if block.

// /* ---------------------------- Scope exercise 3 ---------------------- */

// const serveOrders = function (orders) {

//     for (let order of orders) {
//         let specialOrder = "special " + order
//         console.log("Served a " + specialOrder)
//     }

//     console.log("Finished serving all the orders: " + orders)
// }
// const allOrders = ["fish", "lettuce plate", "curious cheese"]
// serveOrders(allOrders)

// // What will console log?
//     //Served a special fish
//     //Served a special lettuce plate
//     //Served a special curious cheese
//     //Finished serving all the orders: fish,lettuce plate,curious cheese
// // Will there be an error? No
// // Why? 
//     //The function loops through the orders array and prints a message for each item. After the loop, it prints the entire orders array. When an array is concatenated with a string, JavaScript converts it to a comma-separated string.

// // Will something be undefined?No

// // Why?
//     //All variables used are properly defined within their accessible scopes.
// // To what scope does each variable belong?
//     //serveOrders — Global scope (defined at the top level)
//     //allOrders — Global scope (defined at the top level)
//     //orders — Local, function scope (a parameter of serveOrders)
//     //order — Local, block scope (declared with let in the for...of loop block)
//     //specialOrder — Local, block scope (declared with let inside the loop block)
// // Global or local? If local, to which specifically?

// /* ---------------------------- Scope exercise 4 ---------------------- */

// const pot = "red pot with earth in it"

// const getSeed = function () {
//     const seed = "brown seed"
// }

// const plant = function () {
//     getSeed()
//     console.log("Planting the " + seed + " inside a " + pot)
// }

// plant()

// // What will console log?
  //Nothing will successfully log, because the code throws an error before it can print anything.
// // Will there be an error?
//Yes
// // Why?
//seed is not defined
// // Will something be undefined?
        //No
// // To what scope does each variable belong?
    //pot — Global scope
    //seed — Local, function scope
    //plant — Global scope
// // Global or local? If local, to which specifically?

// /* ---------------------------- Scope exercise 5 ---------------------- */

const doesUserExist = function (name) {
    const users = [{ name: "Shapira", age: 19 }, { name: "Lucius", age: 23 }]
    for (let u of users) {
        if (u.name == name) {
            const found = true
        }
    }
    return found
}

const userExists = doesUserExist("Lucius")
if (userExists) {
    console.log("We found the ragamuffin!")
}
else {
    console.log("No idea where this person is.")
}

// // What will console log? Nothing
// // Will there be an error? Yes
// // Why?
    //found is declared with const inside the if block, so it is block-scoped and exists only within that block. After the if ends, found is not accessible. When the function executes return found, found is not defined, leading to a ReferenceError.
// // Will something be undefined?
    //No. 
// // Why?
    //found is not defined in the global scope, but it is defined in the if block.
// // To what scope does each variable belong?
// // Global or local? If local, to which specifically?
// // If anything is unclear, make sure to ask.