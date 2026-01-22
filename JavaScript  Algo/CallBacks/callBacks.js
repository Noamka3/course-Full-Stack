/* ----------------------------  Exercise 1 ---------------------- */
 function pushPull(callback){
    callback();
 }

const push = function () {
  console.log("pushing it!")
}

const pull = function () {
  console.log("pulling it!")
}

pushPull(push) //should print "pushing it!"
pushPull(pull) //should print "pulling it!"



/* ----------------------------  Exercise 2 ---------------------- */


function getTime(callback){
    const time = new Date();
    callback(time);
}


const returnTime = function (time) {
  console.log('The current time is: ' + time.toLocaleString('en-US') )
}

getTime(returnTime);


/* ----------------------------  Exercise 3 ---------------------- */

const displayData = function (alertDataFunc, logDataFunc, data) {
  alertDataFunc(data);
  logDataFunc(data);
};

const logData = function(Data) { console.log(Data); }

displayData(console.error, logData, "I like to party");

/* ----------------------------  Exercise 4 ---------------------- */


const Sums = (A,B,C) =>  A+B+C;

console.log(Sums(2,3,4));

/* ----------------------------  Exercise 5 ---------------------- */

const capitalize = str => str[0].toUpperCase() + str.slice(1).toLowerCase();
console.log(capitalize("bOb"),
capitalize("TAYLOR"), // returns Taylor 
capitalize("feliSHIA") );// returns Felishia



/* ----------------------------  Exercise 6 ---------------------- */

const determineWeather = temp => {
  if(temp > 25){
    return "hot"
  }
  return "cold"
}

function commentOnWeather(temp) {
    const weather = determineWeather(temp);
    console.log("It's " + weather);
}

 //const commentOnWeather = (temp) => console.log("It's " + determineWeather(temp))

commentOnWeather(30)//returns "It's hot"
commentOnWeather(22) //returns "It's cold"