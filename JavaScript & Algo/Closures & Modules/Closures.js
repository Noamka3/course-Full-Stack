
/* ---------------------------- Closures Exercise 1 ---------------------- */

const StringFormatter = function(){
    
    function capitalizeFirst(str){
         if (!str || str.length === 0) return str
        return str[0].toUpperCase() +str.slice(1).toLowerCase();
    }
    function toSkewerCase(str){
        return str.replace(" ", "-");
    }
  return {
    capitalizeFirst,
    toSkewerCase
  }
}

const formatter = StringFormatter()
console.log(formatter.capitalizeFirst("dorothy"));
console.log(formatter.toSkewerCase("blue box"));

/* ---------------------------- Closures Exercise 2 ---------------------- */

const Bank = function(){
    let money = 500;
  const deposit = function (cash) {
    money += cash
  }

  const showBalance = function () {
    console.log(money)
  }

  return {
    deposit,
    showBalance
  }
}
const bank = Bank()
bank.deposit(200)
bank.deposit(250)
bank.showBalance() //should print 950


/* ---------------------------- Closures Exercise 3 ---------------------- */
const SongsManager = function () {
  const songs = {} // פרטי

  const YT_PREFIX = "https://www.youtube.com/watch?v="

  const addSong = function (name, url) {
   
    const id = url.split("v=")[1] // כל מה שבא אחרי v=
    songs[name] = id
  }

  const getSong = function (name) {
    const id = songs[name]
    const fullUrl = YT_PREFIX + id
    console.log(fullUrl)
    return fullUrl
  }

  return {
    addSong,
    getSong
  }
}

const songsManager = SongsManager()
songsManager.addSong("sax", "https://www.youtube.com/watch?v=3JZ4pnNtyxQ")
songsManager.addSong("how long", "https://www.youtube.com/watch?v=CwfoyVa980U")
songsManager.addSong("ain't me", "https://www.youtube.com/watch?v=D5drYkLiLI8")

songsManager.getSong("sax") // מדפיס ומחזיר את הקישור המלא