const num1  =  Number(process.argv[2]);
const operation = process.argv[3];
const num2 = Number(process.argv[4]);

if(isNaN(num1) || isNaN(num2)){
    console.log("Please provide two numbers");
    process.exit(1);
}

let result

switch (operation) {
  case "+":
    result = num1 + num2
    break
  case "-":
    result = num1 - num2
    break
  case "*":
    result = num1 * num2
    break
  case "/":
    if (num2 === 0) {
      console.log("Error: Cannot divide by zero")
      process.exit(1)
    }
    result = num1 / num2
    break
  default:
    console.log("Invalid operation")
    process.exit(1)
}

console.log(num1 + " " + operation + " " + num2 + " = " + result)
