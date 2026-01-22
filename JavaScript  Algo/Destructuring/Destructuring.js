var firstPiece = { id: 101, name: 'Ofri' }

var secondPiece = { country: 'Israel'}

var passport = {...firstPiece,...secondPiece};
console.log(passport);

let meatArr = ["beef","chicken"]
let vegetableArr = ["rabbit","carrots","potatoes","lettuce"]

let fullMeatArr = [...meatArr,vegetableArr[0]]
let vegArr = vegetableArr.slice(1);

let [meat1,meat2,meat3] = fullMeatArr;
let [veg1,veg2,veg3] = vegArr;

console.log(meat1,meat2,meat3);
console.log(veg1,veg2,veg3);


let employeesArr = [
  { name : "Joey" , id: 1 , age: 26},
  { name : "Lily" , id: null , age: 24},
  { name : "Alice" , id: 7 , age: null},
  { name : "Sam" , id: 8 , age: 24},
  { name : "Ray" , id: null , age: null}
  ]

    
for (let i in employeesArr) {
  const emp = employeesArr[i]
  let hasMissing = false
  const employeeMissing = []

  for (let key in emp) {
    if ((emp[key] ?? "MISSING") === "MISSING") {
      hasMissing = true
      employeeMissing.push(key)
    }
  }

  if (hasMissing) {
    console.log(emp.name,employeeMissing)
  }
}