const users = require("./Array_User");
/* ---------------------------- Array Method Exercise 1 ---------------------- */
const Users = users.map( user =>({
    emmail : user.email,
    companyName: user.company.name
}))
console.log(Users)

/* ---------------------------- Array Method Exercise 2 ---------------------- */

const Zip = users.filter(user => user.address.zipcode[0] == 5)
console.log(Zip)

/* ---------------------------- Array Method Exercise 3 ---------------------- */

const Ids = Zip.map(users => users.id)
console.log(Ids)

/* ---------------------------- Array Method Exercise 4 ---------------------- */
// const names = users.filter( users => users.name.startsWith("C"))
// const Id = names.map(users => users.name)

//startsWith - האם המחרוזת מתחילה ב באות שרשמתי
// דרך קצרה יותר
const name = users.map( user => user.name).filter(user => user.startsWith("C"))
console.log(name)

/* ---------------------------- Array Method Exercise 5 ---------------------- */
// const allInSouthChristy = users.filter(u => u.address.city === "South Christy").length === users.length
// every - זה מחזיר true או false
city = users.every(users => users.address.city === "South Christy")

console.log(city)
/* ---------------------------- Array Method Exercise 6 ---------------------- */
const user = users.find( users => users.address.suite === "Apt. 950").company.name
console.log(user)

/* ---------------------------- Array Method Exercise 7 ---------------------- */
function printInfo(user){
    console.log(user.name + "lives in" + user.address.city + ", and owns the company" + user.company.name)
}

users.forEach(printInfo);

/* ---------------------------- Array Method Exercise 8 ---------------------- */

let inventory = [
    { name: "Laptop", price: 899.99, quantity: 5 },
    { name: "Mouse", price: 24.99, quantity: 12 },
    { name: "Keyboard", price: 79.99, quantity: 8 },
    { name: "Monitor", price: 249.99, quantity: 3 },
    { name: "Headphones", price: 149.99, quantity: 6 }
]

const sum = inventory.reduce((total,item) => total + item.price*item.quantity,0)
console.log(sum)


/* ---------------------------- Array Method Exercise 9 ---------------------- */


const studentScores = [92, 87, 76, 95, 88, 72, 91, 83, 79, 96, 85, 74, 89, 93, 81]

const grade = studentScores.reduce((acc,score) =>{
    if( score >= 90)  acc.A++
      else if (score >= 80) acc.B++
      else if (score >= 70) acc.C++
      else acc.F++
      return acc
},{A:0,B:0,C:0,F:0})
console.log(grade)

/* ---------------------------- Array Method Exercise 10 ---------------------- */

let cartItems = [
    { name: "T-shirt", price: 19.99, category: "clothing", quantity: 2 },
    { name: "Laptop", price: 1299.99, category: "electronics", quantity: 1 },
    { name: "Coffee Beans", price: 12.99, category: "food", quantity: 3 },
    { name: "Headphones", price: 89.99, category: "electronics", quantity: 1 },
    { name: "Jeans", price: 59.99, category: "clothing", quantity: 1 }
]

let taxRates = {
    clothing: 0.08,    // 8% tax
    electronics: 0.10, // 10% tax  
    food: 0.05        // 5% tax
}

const total = cartItems.reduce((sum,item) =>{
    const taxRate = taxRates[item.category] || 0
    const itemtotal = item.price * item.quantity*(1 + taxRate)
    return sum + itemtotal;
},0)
console.log(total)