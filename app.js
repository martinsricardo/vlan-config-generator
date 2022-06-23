const express = require("express");
const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

//const { myArray } = require('.//script');

app.get("/", (req, res) => {
  //res.render("index");
  res.sendFile(__dirname + "/public/index.html");
});


app.listen(3000, () => {
  console.log(`Example app listening on port http://localhost:3000`);
});
