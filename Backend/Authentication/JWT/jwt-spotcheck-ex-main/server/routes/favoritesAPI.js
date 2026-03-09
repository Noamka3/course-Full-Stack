
const express = require('express');
const router = express.Router();
const users = require('../../fakeDB/users')

const secretKey = 'my_secret_key';


router.get('/animals',(req, res) => {
  try {
    res.send({message:"some animal"});
  } catch (error) {
    console.log(error)
    res.status(401).send({ message: 'Something went wrong' });
  }
});

function findUser(id, username) {
  return users.filter(user => user.id === id && user.username === username)[0]
  ;
}


module.exports = router;
