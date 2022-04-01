const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let vlanConfig = [];
let error = [];

app.get("/", (req, res) => {
  res.render("vlan", {
    error: error,
    vlanConfig: vlanConfig,
  });
});

app.post("/", (req, res) => {
  vlanConfig = [];
  error = [];
  let numVlan = req.body.numberVlans;
  if (numVlan > 30) {
    let errorMessage = "The max number of VLANS is 30";
    error.push(errorMessage);
    res.redirect("/");
  } else {
  
    let i = 0;
    for( let i = 0; numVlan > i ; i++) {
      let vlan = {
        vlanNumber: i,
        config:[{
          name:"",
          switchPortMode:""
        }]
      };
      vlanConfig.push(vlan);
    }

    console.log(vlanConfig);
    res.redirect("/");
  }
});

app.post("/generate", (req, res) => {
  console.log(req.body.ola);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ...`);
});
