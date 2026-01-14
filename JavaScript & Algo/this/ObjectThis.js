
/* ---------------------------- Object This exercise 1 ---------------------- */
const person = {
  hungry: true,

  feed: function () {
    if (this.hungry) {
      this.hungry = false;
      console.log('Im no longer hungry!')
    }
  }
}  

person.feed() //should log "I'm no longer hungry"

/* ---------------------------- Object This exercise 2 ---------------------- */
const pump = function (amount) {
  this.liters += amount;
  console.log('You put ' + amount + ' liters in ' + this.name);
};

const garage = {
  car1: {
    name: 'Audi',
    liters: 3,
    fillTank: pump
  },
  car2: {
    name: 'Mercedes',
    liters: 1,
    fillTank: pump
  }
};

garage.car1.fillTank(2);
console.log('Audi should have 5 liters: ',  garage.car1.liters);

garage.car2.fillTank(30);
console.log('Mercedes should have 31 liters: ', garage.car2.liters);



const pumpFuel = function (plane) {
  plane.fuel += 1;
};

const airplane = {
  fuel: 0,
  fly: function () {
    if (this.fuel < 2) {
      return 'on the ground!';
    }
    else {
      return 'flying!';
    }
  }
};

console.log('The plane should not be able to fly (yet): ' + airplane.fly());

pumpFuel(airplane);
console.log('The plane should STILL not be able to fly: ' + airplane.fly());

pumpFuel(airplane);
console.log('Take off! ' + airplane.fly());

/* ---------------------------- Object This exercise 4 ---------------------- */

const tipJar = {
  coinCount: 20,
  tip: function () {
    this.coinCount += 1;
  },
  stealCoins : function(num)
{
    this.coinCount -= num;
}};

tipJar.tip();
console.log('Tip jar should have 21 coins: ' + tipJar.coinCount);

tipJar.stealCoins(3);
console.log('Tip jar should have 18 coins: ' + tipJar.coinCount);

tipJar.stealCoins(10);
console.log('Tip jar should have 8 coins: ' + tipJar.coinCount);

/* ---------------------------- Object This exercise 5 ---------------------- */


const revealSecret = function () {
  return this.secret;
};

const shoutIt = function (person, func) {
  person.revealItAll = func;
  const result = person.revealItAll();
  console.log(person.name + " said: " + result);
};

const avi = {
  name: "Avi",
  secret: "Im scared of snakes!"
};

const narkis = {
  name: "Narkis",
  secret: "I don't have secrets because I'm zen like that."
};

shoutIt(avi, revealSecret);
shoutIt(narkis, revealSecret);


/* ---------------------------- Object This exercise 6 / 6.1  / 6.2 ---------------------- */

const coffeeShop = {
  beans: 40,
  money: 1000,

  drinkRequirements: {
    latte: {beanRequirement: 10, price: 5},
    americano: {beanRequirement: 5 , price: 10},
    doubleShot: {beanRequirement: 15, price: 15},
    frenchPress: {beanRequirement: 12, price: 20}
  },

  makeDrink: function (drinkType) {
    // TODO: Finish this method
    if(this.drinkRequirements[drinkType]){
        if(this.beans >= this.drinkRequirements[drinkType].beanRequirement){
            this.beans -= this.drinkRequirements[drinkType].beanRequirement;
            console.log("Enjoy your " + drinkType);
        }
        else{
            console.log("Sorry, we're all out of beans");
        }
    }
    else{
        console.log("Sorry, we don't make " + drinkType);
        return;
    }

  },
  buyBeans: function(num){
    if(this.money < num * 10){
        console.log("Sorry, you don't have enough money");
        return;
    }
    this.money -= num * 10;
    this.beans += num;
  },
  buyDrink: function(drinkType){
    if(this.drinkRequirements[drinkType]){
        this.money += this.drinkRequirements[drinkType].price;
        this.makeDrink(drinkType);
    }
    else{
        console.log("Sorry, we don't make " + drinkType);
    }
  }
}

coffeeShop.makeDrink("latte"); 
coffeeShop.makeDrink("americano");
coffeeShop.makeDrink("filtered"); //should console "Sorry, we don't make filtered"
coffeeShop.makeDrink("doubleShot");
coffeeShop.makeDrink("frenchPress"); //should console "Sorry, we're all out of beans"
coffeeShop.makeDrink("aaaa");




