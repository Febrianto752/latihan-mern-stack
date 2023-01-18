require("dotenv").config();
const mongoose = require("mongoose");
const { URL_ROOT_DB } = process.env;
const { DB_NAME } = process.env;
const urlDB = `${URL_ROOT_DB}/${DB_NAME}`;
mongoose.connect(urlDB);

const User = require("./models/user");
const { faker } = require("@faker-js/faker");

const users = [];

for (let i = 0; i < 1000; i++) {
  const user = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    gender: faker.name.sexType(),
  };
  users.push(user);
}

async function seeder() {
  await User.insertMany(users);
  return new Promise((resolve, reject) => resolve("success"));
}

seeder().then(() => {
  mongoose.connection.close();
});

console.log("selesai");
