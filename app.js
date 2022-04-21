const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
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

app.post("/generate", (req, res) => {
  let vlanName = req.body.vlanName;
  console.log(
    "-----------------------------------------------------------------"
  );
  //console.log(vlanName);
  var interfaceName = req.body.interfaceName;

  //vlanConfig[0].interfaceConfig[0] = interfaceName1;
  console.log(interfaceName);

  /*
  let deleteInterface = req.body.deleteInterface;
  console.log("Index to be deleted : " + deleteInterface);*/

  let addinterface = req.body.addInterface;

  //Quando clicado no botao adiciona uma interface
  if (addinterface != undefined) {
    var interf = {
      interfaceName: "",
      switchPortMode: "",
    };

    vlanConfig[addinterface - 1].interfaceConfig.push(interf);
   
  }
  let newArr = [];
  var tempArr = [];

  for (var i = 0; i < vlanConfig.length; i++) {
    //console.log(vlanConfig.length);
    vlanConfig[i].name = vlanName[i];

    if (interfaceName === undefined) {
      console.log("Not an array");
      
      
    } else {
 
      let numObj = vlanConfig[i].interfaceConfig.length; //1
      for (let idk = 0; vlanConfig[i].interfaceConfig.length > idk; idk++) {
        var sliced = interfaceName.slice(0, numObj); // array BC
                newArr.push(sliced[idk]); //A //B
        
        if (newArr[idk] === undefined) {
          console.log("Está :undefined - " + newArr);
          let defined = [];
          defined.push(newArr[idk]);
          console.log("Pushed Defined:" + defined[idk]);
          vlanConfig[i].interfaceConfig[idk].interfaceName = defined[idk];
        } else {
          vlanConfig[i].interfaceConfig[idk].interfaceName = newArr[idk]; 
          console.log("Pushed: " + newArr[idk]);
         
        }
      }
      try {
        for (var shiftIndex = 0; numObj > shiftIndex; shiftIndex++) {
          interfaceName.shift();
        }
      }
      catch(err) {
      res.redirect("/")
      }
      console.log("Após shifts tem: " + interfaceName);
      newArr = [];
      console.log("Final" + shiftIndex + ": " + interfaceName);
      console.log("Numero de Interfaces:" + numObj);
    
  }
  }
  console.log(vlanConfig);
  console.log(vlanConfig[0].interfaceConfig[0]);
  //console.log(vlanConfig[0].interfaceConfig[1]);
  console.log(vlanConfig[1].interfaceConfig[0]);
  //console.log(vlanConfig[1].interfaceConfig[1]);
  res.redirect("/");
});

app.post("/teste", (req, res) => {
  console.log(req.body.vlanInput);
  let vlan = req.body.vlanInput;
  let objectJson = [];
  vlan.forEach((element) => {
    objectJson.push({
      vlanName: element,
    });
  });
  console.log(objectJson);

  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ...`);
});
