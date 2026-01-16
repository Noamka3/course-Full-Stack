/* ---------------------------- Recursion exercise 1 ---------------------- */

function factorials (num,result){
    if(num == 0){
        return result;
    }
    return factorials(num-1,num*result);
}

console.log(factorials(8,1));

/* ---------------------------- Recursion exercise 2 ---------------------- */
function reverseString(str){
    if(str.length === 0){
        return "";
    }
    return reverseString(str.slice(1)) + str[0];
}   
console.log(reverseString("hello"));

/* ---------------------------- Recursion exercise 3 ---------------------- */

const swap = function (arr1, arr2) {
  if (arr1.length === 0) {
    return
  }

  arr2.push(arr1.shift()) 
  swap(arr1, arr2)
}


const arr1 = [1, 2, 3]
const arr2 = []
swap(arr1, arr2)
console.log(arr1)
console.log(arr2)
