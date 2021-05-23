const sequelize = require("../config/connection");
const { User, BlogPost } = require("../models");

const userSeedData = require("./userSeedData.json");
const postSeedData = require("./postSeedData.json");

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    const users = await User.bulkCreate(userSeedData);

    // TODO: continue creating seed script
}
