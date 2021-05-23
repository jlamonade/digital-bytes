const { User } = require("../models");

const userData = [
  {
    name: "Jason",
    email: "nyjasonlam@gmail.com",
    password: "asdfjason",
  },
  {
    name: "Joseph",
    email: "joseph@gmail.com",
    password: "asdfjoseph",
  },
];

const seedUserData = () => User.bulkCreate(userData);

module.exports = seedUserData;
