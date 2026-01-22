const greet = function(){
  console.log("Hello there")
}

/* ---------------------------- Function Exercise 1 ---------------------- */
function isEven(num)
{
 return num % 2 === 0;
}

console.log(isEven(2));

/* ---------------------------- Function Exercise 2 ---------------------- */


num = [1,2,3,4,5,6,7,8,9,10];

function numbers(num)
{
    for(let number of num){
        if(!isEven(number)){
          console.log(number);
        }
    }
    return num;
}

numbers(num)
/* ---------------------------- Function Exercise 3 ---------------------- */

nums = [1,2,3,4,5,6,7,8,9,10];
number = 5;

function checkExists(nums,number){
    for(let num of nums){
        if(num === number){
            return true;
        }
    }
    return false;
}

console.log(checkExists(nums,number));

/* ---------------------------- Function Exercise 4 ---------------------- */
const calculator = {
  add: function(a, b) {
    return a + b;
  },
  subtract: function(a, b) {
    return a - b;
  }
};

const result1 = calculator.add(20, 1)
const result2 = calculator.subtract(30, 9)

console.log(calculator.add(result1, result2))


/* ---------------------------- Function Exercise 5 ---------------------- */
function increaseByNameLength(money, name){
    return money * name.length;
}
function makeRegal(name){
    return "His Royal Highness, " + name;
}
const turnToKing = function(name, money){
    name = name.toUpperCase()
    money = increaseByNameLength(money, name)
    name = makeRegal(name)
    console.log(name + " has " + money + " gold coins")
}

turnToKing("martin luther", 100);

/* ---------------------------- Function Exercise 6 ---------------------- */

function Armstrong(num){
    let sum =0;
    let temp = num;
    while(temp > 0){
        digit = temp % 10;
        sum += digit * digit * digit;
        temp = parseInt( temp / 10);
    }
    return num == sum;
}
console.log(Armstrong(153));

/* ---------------------------- Function Exercise ---------------------- */


const people_info = [
  {
    name: "guido",
    profession: "bungalow builder",
    age: 17,
    country: "canaland",
    city: "sydurn",
    catchphrase: "what a piece of wood!"
  },
  {
    name: "petra",
    profession: "jet plane mechanic",
    age: 31,
    country: "greenmark",
    city: "bostork",
    catchphrase: "that's my engine, bub"
  },
  {
    name: "damian",
    profession: "nursery assistant",
    age: 72,
    country: "zimbia",
    city: "bekyo",
    catchphrase: "with great responsibility comes great power"
  }
]

const capitalize = function(str) {
return str[0].toUpperCase() + str.slice(1);
};
console.log(capitalize("hello"));

const getAge = function(age){
    if( age < 21)
        return "Underage";
    else if(age > 55){
        return "55+";
    }
    else{
        return age;
    }
}

const titleCase = function (str) {
  const words = str.split(" ");
  let result = "";

  for (let i = 0; i < words.length; i++) {
    result += capitalize(words[i]);
    if (i !== words.length - 1) result += " ";
  }

  return result;
};

const capitalizeProfession = function (person) {
  return titleCase(person.profession);
};

const capitalizeCatchphrase = function (person) {
  return titleCase(person.catchphrase);
};

const getLocation = function(person){
    return titleCase(person.city) + ", " + titleCase(person.country);
}
const getSummary = function (person) {
  const name = capitalize(person.name);
  const ageText = getAge(person.age);
  const profession = capitalizeProfession(person);
  const location = getLocation(person);
  const phrase = capitalizeCatchphrase(person);

  return (
    name +
    " is " +
    ageText +
    " " +
    profession +
    " from " +
    location +
    ". " +
    name +
    " loves to say " +
    phrase +
    "."
  );
};

console.log(getSummary(people_info[0]));

/* ---------------------------- Function Exercise ---------------------- */
const story = "In the beginning there was light. Then there were wolves. Finally there was a big fire. Ultimately, Shelob the wolf-master put out the fire with her feet. But until then, the fire caused one heck of a lot of damage."
const specialChars = [",", ".", "'", '"', "?", "!", ";"]
const wordCounts = {}


function cleanStory(story){
    clean_story = story.toUpperCase();
    for(let i in specialChars){
        clean_story = clean_story.split(specialChars[i]).join("");
    }
    const word = clean_story.split(" ");
    return word;
}

function addToWord(word){
    for(let i in word){
        const w = word[i];
        if( w == "") continue;
        wordCounts[w] = (wordCounts[w]|| 0) + 1;
    }
     return wordCounts;
}

function countwords(sentence) {
  const words = cleanStory(sentence);
  const wordCounts = addToWord(words);
  return wordCounts;
}
console.log(countwords(story));










