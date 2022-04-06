const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let vlanConfig = [];
let error = [];
var vlan = [];

app.get("/", (req, res) => {
  res.render("vlan", {
    error: error,
    vlanConfig: vlanConfig,
  });
});

//Primeiro cria o numero de vlans pedido
app.post("/", (req, res) => {
  vlanConfig = [];
  error = [];
  let numVlan = req.body.numberVlans;
  if (numVlan > 30) {
    let errorMessage = "The max number of VLANS is 30";
    error.push(errorMessage);
    res.redirect("/");
  } else {
    for (let i = 0; numVlan > i; i++) {
      vlan = {
        vlanNumber: i + 1,
        name: "",
        interfaceConfig: [],
      };
      vlanConfig.push(vlan);
    }

    console.log(vlanConfig);
    res.redirect("/");
  }
});

//Quando clicado no botao adiciona uma interface
app.post("/generate", (req, res) => {
  let vlanName = req.body.vlanName;
  console.log(vlanName);

  let addinterface = req.body.addInterface;
  console.log("input = " + addinterface);


  if (addinterface != undefined) {
    var interf = {
      interfaceName: "Teste",
      switchPortMode: "access",
    };
    vlanConfig[addinterface - 1].interfaceConfig.push(interf);
  }

  for (var i = 0; i < vlanConfig.length; i++) {
    vlanConfig[i].name = vlanName[i];
   
  }

  console.log(vlanConfig);
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ...`);
});
