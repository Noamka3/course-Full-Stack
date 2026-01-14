/* ---------------------------- Lofical and Varibles Exercise 1 ---------------------- */


// (5 > 2) && false    ------------------------->FALSE
// !("knife" === "sword") ----------------------->TRUE
// (1 < 2) || (-1 > -1) || !false ---------------->TRUE
// "" ------------------------------------------->FALSE
// (31 % 5) == "1" ------------------------------->true
// !!true ----------------------------------------->TRUE
// "5th Avenue" != "5th Avenue" ------------------->FALSE
// 52 !== "52" ------------------------------------->TRUE
// (undefined || null) ------------------------------------->NULL

/* ---------------------------- Lofical and Varibles Exercise 2 ---------------------- */

let a = 3 
let c = 0
let b = a
b = a // 3
c = a // 3
b = c // 3
a = b // 3
/* ---------------------------- Array Exercise  ---------------------- */

// const numbers = [1,2,3,4,5,6,7,8,9,10]
// numbers.splice(1,2)
// console.log(numbers)
// numbers.splice(3,1,1)
// console.log(numbers);
// numbers.splice(4,4);
// console.log(numbers);
// numbers.unshift(0);
// console.log(numbers);


/* ---------------------------- Object Exercise  ---------------------- */

 let p1 = {
    name:"Noam",
    age:25,
    city: "Dimona"

};

let p2 = {
  name: "Robert",
  age: 25,
  city: "Tel Aviv"
};

if(p1.age == p2.age)
{
    if(p1.city === p2.city){
        console.log(`${p1.name} wanted to date ${p2.name}`);
    }
    else {
    console.log(`${p1.name} wanted to date ${p2.name}, but couldn't`);
    }

}

const library = {
    Books: 
    [
        {tile: "A", author: "1"},
        {tile: "b", author: "2"},
        {tile: "c", author: "3"},
        {tile: "d", author: "4"},
        {tile: "e", author: "5"},
    ]
    
}

const reservations = {
  Bob: { claimed: false },
  Ted: { claimed: true }
}
const name = "ted";
const nameLower = name.toLowerCase(); // אותיות קטנות
let realName = null;

if (nameLower === "bob") {
  realName = "Bob";
} else if (nameLower === "ted") {
  realName = "Ted";
}


if (realName !== null) {

  if (reservations[realName].claimed === false) {
    console.log("Welcome, " + realName);
    reservations[realName].claimed = true; 
  } else {
    console.log("Hmm, someone already claimed this reservation");
  }
} else {

  console.log("You have no reservation");
  reservations[name] = { claimed: true };
}



const date = 3

const kitchen = {
    owner: "Geraldine",
<<<<<<< HEAD
    hasOven: true/false,
=======
    hasOven: true/false, 
>>>>>>> 3077597 (JavaScript 13-14/1 - callback,Array,Object this)
    fridge: {
        price: 500,
        works: true/false, 
        items: [
            { name: "cheese", expiryDate: 7 },
            { name: "radish", expiryDate: 2 },
            { name: "bread", expiryDate: 1 }
        ]
    }
}

// משתני עזר
const owner = kitchen.owner;
const hasOven = kitchen.hasOven;
const works = kitchen.fridge.works;
const fridgePrice =  kitchen.fridge.price;
const items = kitchen.fridge.items;

let item = null;
//1
for( let i = 0; i < items.length; i ++){
    if(items[i].name === "radish"){
        item = items[i];
        break;
    }
}
console.log(item);
//2
const daysExpired  =  date - item.expiryDate;
console.log(daysExpired);

//3
if (works === true && hasOven === true) {
  console.log(
    owner + "'s " + item.name + " expired " + daysExpired +
    " day ago. Weird, considering her fridge works. Luckily, she has an oven to cook the " +
    item.name + " in."
  );
}

if (works === true && hasOven === false) {
  console.log(
    owner + "'s " + item.name + " expired " + daysExpired +
    " day ago. Weird, considering her fridge works. Too bad she doesn't have an oven to cook the " +
    item.name + " in."
  );
}

if (works === false && hasOven === true) {
  console.log(
    owner + "'s " + item.name + " expired " + daysExpired +
    " day ago. Probably because her fridge doesn't work. Luckily, she has an oven to cook the " +
    item.name + " in. And she'll have to pay " + fixPrice + " to fix the fridge."
  );
}

if (works === false && hasOven === false) {
  console.log(
    owner + "'s " + item.name + " expired " + daysExpired +
    " day ago. Probably because her fridge doesn't work. Too bad she doesn't have an oven to cook the " +
    item.name + " in. And she'll have to pay " + fixPrice + " to fix the fridge."
  );
}

/* ---------------------------- Loop Exercise  ---------------------- */

const names = ["Ashley", "Donovan", "Lucas"]
const ages = [23, 47, 18]
const people = []

for (let i in names) {
  people.push({ name: names[i], age: ages[i] });
}
console.log(people);

for( let person of people){
    console.log(person.name + " is " + person.age + " years old");
}




const posts = [
  {id: 1, text: "Love this product"},
  {id: 2, text: "This is the worst. DON'T BUY!"},
  {id: 3, text: "So glad I found this. Bought four already!"}
];

let indexToRemove = -1;

for (let i = 0; i < posts.length; i++) {
  if (posts[i].id === 2) {
    indexToRemove = i;
    break;
  }
}

if (indexToRemove !== -1) {
  posts.splice(indexToRemove, 1);
}

console.log(posts);
