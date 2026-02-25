const express = require("express");
const app = express();

const PORT = 3000;
let counter = 0;


//Middleware-1
app.use((req,res,next) => { 
    if (req.url === "/favicon.ico") return next();
    req.timestamp = new Date().toISOString();
    console.log(`Console: [${req.timestamp}] ${req.method} ${req.url}`);
    next();
});

//Middleware-2
app.use((req,res,next) => { 
    counter++;
    next();
})

app.get("/",(req,res) =>{
    const response = {
        message: "Welcome!",
        timestamp: req.timestamp,
        requestCount: counter
    }
    console.log('Response:',JSON.stringify(response));
    res.json(response);
});

app.get("/about",(req,res) =>{
    const response = {
        message: "About page",
        timestamp: req.timestamp,
        requestCount: counter
    }
  console.log('Response:', JSON.stringify(response));
  res.json(response);
});

app.listen(PORT,()=>{
    console.log(`Server running http://localhost:${PORT}`);
})
