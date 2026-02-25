const express =require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]

const ValidateId = (req,res,next) => {
    const id = parseInt(req.params.id);
if(isNaN(id)) {
    return next({ status: 400, message: 'Invalid ID format' });
}
req.id = id;
next();
};

const checkResource = (req,res,next) =>{
    const user = users.find(u => u.id === req.id);
    if(!user) {
        return next({ status: 404, message: 'User not found' });
    }
    req.user = user;
    next();
};

const errorHandler = (err,req,res,next) =>{
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).send(message);
};

app.get('/users',(req,res) => {
    res.json(users);
})

app.get('/users/:id',ValidateId,checkResource,(req,res) => {
    res.json(req.user);
})

app.post('/users',(req,res) => {
    const newUser = {id: users.length +1, ...req.body }
    users.push(newUser);
    res.status(201).send(newUser);
})

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});