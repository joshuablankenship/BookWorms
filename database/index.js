const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const userSchema = mongoose.Schema({
  username: String,
  wins: Number,
  losses: Number,
});

const User = mongoose.model('User', userSchema);

const save = (name, pass) => {
  let user = new User({
    username: name,
    password: pass,
  });
  user.save( (error) => {
    console.log(user);
    console.log('Your user has been saved!');
    if (error) {
      console.error(error);
    }
  });
};
// const selectAll = (callback) => {
//   User.find({}, (err, users) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, users);
//     }
//   });
// };

// module.exports.selectAll = selectAll;
module.exports.save = save;
