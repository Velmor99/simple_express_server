const express = require("express");
const path = require("path");
const server = express();
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

server.engine("hbs", hbs.engine);
server.set("view engine", "hbs");
server.set("views", "views");

server.use(express.static(path.join(__dirname, "public")));

//Необходимо что бы обрабатывать req.body в post запросах и получать объект
server.use(express.urlencoded({ extended: true }));

server.use("/", homeRoutes);
server.use("/courses", coursesRoutes);
server.use("/add", addRoutes);
server.use("/card", cardRoutes);

server.listen(3000, () => {
  console.log("Server has started");
});
