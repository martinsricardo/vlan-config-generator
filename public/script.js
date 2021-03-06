let myArray = [];

let id = 0;

function start() {
  let output = document.getElementById("output");

  let vlanForm = document.createElement("form");
  vlanForm.method = "post";

  output.appendChild(vlanForm);

  document
    .getElementById("insertVlan")
    .addEventListener("click", () => insertVlan(vlanForm));
}

function insertVlan(vlanformParam) {
  let div = document.createElement("div");

  vlanformParam.appendChild(div);

  //Span Vlan number
  let vlanNumber = document.createElement("span");
  vlanNumber.textContent = "Vlan number:";
  div.appendChild(vlanNumber);

  //Field Vlan Number
  let inputVlanNumber = document.createElement("input");
  inputVlanNumber.type = "number";
  inputVlanNumber.style.width = "50px";
  inputVlanNumber.name = "vlanNumber";
  div.appendChild(inputVlanNumber);

  //Field Vlan Name
  let inputVlanName = document.createElement("input");
  inputVlanName.placeholder = "Vlan name";
  inputVlanName.name = "vlanName";
  div.appendChild(inputVlanName);

  document.getElementById("generateCode").style.display = "block";
  document.getElementById("downloadCode").style.display = "block";

  let vlan = {
    id: (id += 1),
    vlanNumber: "",
    vlanName: "",
    interfaces: [],
  };
  myArray.push(vlan);

  console.log(myArray);
  let btnInterface = document.createElement("button");
  btnInterface.textContent = "Add interface";
  btnInterface.type = "button";
  div.appendChild(btnInterface);
  let index = id;

  btnInterface.addEventListener("click", () => addInterface(index, div));
  /*
 let btnDownload = document.getElementById("downloadCode")
 vlanformParam.appendChild(btnDownload) */
}

function addInterface(index, div) {
  //console.log(index)
  let val = Math.floor(1000 + Math.random() * 9000);
  let interfaceObj = {
    id: val,
    interfaceName: "",
    portMode: "",
  };

  for (let i = 0; myArray.length > i; i++) {
    if (myArray[i].id == index) {
      myArray[i].interfaces.push(interfaceObj);
    }
  }

  let divInt = document.createElement("div");
  divInt.id = val;
  div.appendChild(divInt);

  let inputInterface = document.createElement("input");
  inputInterface.placeholder = "Interface name";
  inputInterface.name = "interface";
  inputInterface.id = val;
  inputInterface.style.margin = "5px";
  divInt.appendChild(inputInterface);

  let switchPortModeEl = document.createElement("select");
  switchPortModeEl.id = "switchPortModeOption";
  switchPortModeEl.name = "swMd";
  divInt.appendChild(switchPortModeEl);

  //Option 1
  let option1 = document.createElement("option");
  option1.value = "Access";
  option1.textContent = "Access";
  switchPortModeEl.appendChild(option1);

  //Option 2
  let option2 = document.createElement("option");
  option2.value = "Trunk";
  option2.textContent = "Trunk";
  switchPortModeEl.appendChild(option2);

  //Option 3
  let option3 = document.createElement("option");
  option3.value = "Dynamic";
  option3.textContent = "Dynamic";
  switchPortModeEl.appendChild(option3);

  let btnInterfaceDelete = document.createElement("button");
  btnInterfaceDelete.textContent = "X";
  btnInterfaceDelete.type = "button";
  divInt.appendChild(btnInterfaceDelete);
  btnInterfaceDelete.addEventListener("click", () =>
    deleteInterface(index, val)
  );
  console.log(myArray);

  //finalArray.push(myArray);

  //alert(myArray[index].interfaces.indexOf())
}

function deleteInterface(index, val) {
  var newArray = myArray[index - 1].interfaces.filter(
    (item) => item.id !== val
  );
  myArray[index - 1].interfaces.length = 0;
  newArray.forEach((element) => {
    myArray[index - 1].interfaces.push(element);
  });
  console.log(myArray);
  //myArray[index - 1].interfaces.push(newArray)
  var elem = document.getElementById(val);
  elem.parentNode.removeChild(elem);
  return false;

}

function generateCode() {
  //Input em Vlan Name e Vlan Number

  let vlanNumber = document.getElementsByName("vlanNumber");
  let vlanName = document.getElementsByName("vlanName");

  let vlanNumberArray = [];
  let vlanNameArray = [];

  //console.log(vlanNumber);
  //console.log(vlanName);

  for (let indexe = 0; vlanNumber.length > indexe; indexe++) {
    if (vlanNumber[indexe].value == "") {
      alert("Vlan number is empty");
      return false;
    } else {
      if (vlanNumber[indexe].value <= 1 || vlanNumber[indexe].value > 1005) {
        alert("Vlan number must be with id between 2 and 1005");
        return false;
      }
      vlanNumberArray.push(vlanNumber[indexe].value);
    }
  }

  let numObj = myArray.length;
  console.log(vlanNumberArray);
  for (let i = 0; i < numObj; i++) {
    //console.log("numObj" + numObj);
    let sliced1 = vlanNumberArray.slice(0, numObj); // a,b
    myArray[i].vlanNumber = sliced1[i];
    let sliced = vlanNameArray.slice(0, numObj); // a,b
    myArray[i].vlanName = sliced[i];
  }

  for (let indexed = 0; numObj > indexed; indexed++) {
    vlanNumberArray.shift();
    vlanNameArray.shift();
  }
  //Vlan name em branco insere default
  for (let indexe = 0; vlanName.length > indexe; indexe++) {
    if (vlanName[indexe].value == "") {
    } else {
      vlanNameArray.push(vlanName[indexe].value);
    }
  }

  for (let i = 0; i < numObj; i++) {
    let sliced = vlanNameArray.slice(0, numObj); // a,b
    myArray[i].vlanName = sliced[i];
  }

  //Input em SwitchPortMode
  let vlanSw = document.getElementsByName("swMd");
  let switchPortModeArray = [];
  for (let indexe = 0; vlanSw.length > indexe; indexe++) {
    switchPortModeArray.push(vlanSw[indexe].value);
  }
  //console.log(switchPortModeArray);

  //Input em Interface Name
  let interfaceName = document.getElementsByName("interface");
  let interfaceNameArray = [];
  for (let indexe = 0; interfaceName.length > indexe; indexe++) {
    interfaceNameArray.push(interfaceName[indexe].value);
  }

  for (let i = 0; i < myArray.length; i++) {
    let numObj = myArray[i].interfaces.length; //2
    //console.log("numObj" + numObj);
    for (let ind = 0; numObj > ind; ind++) {
      //2
      let sliced2 = switchPortModeArray.slice(0, numObj);
      let sliced = interfaceNameArray.slice(0, numObj); // a,b
      myArray[i].interfaces[ind].interfaceName = sliced[ind];
      myArray[i].interfaces[ind].portMode = sliced2[ind];
    }
    for (let indexed = 0; numObj > indexed; indexed++) {
      switchPortModeArray.shift();
      interfaceNameArray.shift();
    }
  }
  console.log(myArray);
  generateText();
}

function generateText() {
  let divgeneratetext = document.getElementById("generateText");
  divgeneratetext.textContent = "";
  divgeneratetext.style.display = "block";
  myArray.forEach((element) => {
    let outVlanNumber = document.createElement("p");
    outVlanNumber.textContent = "switch(config)# vlan " + element.vlanNumber;
    divgeneratetext.appendChild(outVlanNumber);

    if (element.vlanName === undefined) {
    } else {
      let outVlanName = document.createElement("p");
      outVlanName.textContent = "switch(config-vlan)# name " + element.vlanName;
      divgeneratetext.appendChild(outVlanName);
    }

    element.interfaces.forEach((element) => {
      let outInterfaceName = document.createElement("p");
      outInterfaceName.textContent =
        "switch(config-if)# interface " + element.interfaceName;
      divgeneratetext.appendChild(outInterfaceName);

      let outSwitchPortMode = document.createElement("p");
      outSwitchPortMode.textContent =
        "switch(config-if)# switchport mode " + element.portMode;
      divgeneratetext.appendChild(outSwitchPortMode);
    });
  });
}

function downloadCode() {
  alert("download");
  var blob = new Blob([],  {type: "text/plain"});
  for(let i = 0 ; myArray.length > i ; i++){
    var blob = new Blob([blob,"vlan "+myArray[i].vlanNumber+"\n"+"name "+myArray[i].vlanName+"\n"], { type: "text/plain;charset=utf-8" });
    for(let i2 = 0 ; myArray[i].interfaces.length > i2 ; i2++){
      var blob = new Blob([blob,"interface "+myArray[i].interfaces[i2].interfaceName +"\n"+"switchport mode "+myArray[i].interfaces[i2].portMode+"\n"], { type: "text/plain;charset=utf-8" });
    }
  }
  saveAs(blob, "dynamic.txt");
  
    //var blob = new Blob([blob,"\n"+element.vlanNumber+"\n"+element.vlanName+"\n"+element.interfaceName+"\n"+element.portMode], { type: "text/plain;charset=utf-8" });
    


    

 
  /*
let arrayToString = JSON.stringify(myArray)
localStorage.setItem('code', arrayToString);*/
}

// Start file download.
//download("code.txt","Ola");

//exports.myArray = myArray;

/*let p = new Promise((resolve,reject) => {
    let a= 1+1;
    if(a ==2){
      resolve("success");
    }else{
      reject("failed");
    }
  })
  
  p.then((message)=>{
    console.log('This is in the then '+ message)
  }).catch((message) => {
    console.log('this is in the catch ' + message)
  })*/

/* VLAN0050
 let vlanId = myArray[indexe].vlanNumber;

 function padLeadingZeros(num,size) {
     let s = num+"";
     while (s.length < size) s = "0" + s;
     return s;
 }

 let defaultVlan = padLeadingZeros(vlanId,4);

 console.log(defaultVlan)
 vlanNameArray.push("VLAN"+ defaultVlan)
*/
