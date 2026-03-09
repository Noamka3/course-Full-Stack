const bcrypt = require('bcryptjs')


const users = [
    {
      id: 1,
      username: 'ameerj',
      password: 'meowmeow', // hashed password: 'password'
      animal:"cat"
    },
    {
      id: 2,
      username: 'lotemh',
      password: "natureisamazing!",// hashed password: '123456'
      animal:"owl"
    }
  ];
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

  users.forEach(user => {
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  });
  
module.exports = users;
  