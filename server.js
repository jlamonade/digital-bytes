const express = require("express");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");

const app = express();
const hbs = exphbs.create({});
const PORT = process.env.PORT || 3001;

// HANDLEBARS
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONTROLLERS
app.use(routes);

// INIT
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}.`);
  });
});
