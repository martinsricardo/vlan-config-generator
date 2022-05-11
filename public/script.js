let myArray = [];
let output = document.getElementById("output");
let finalArray = [];

let vlanForm = document.createElement("form");
vlanForm.method = "post";


output.appendChild(vlanForm);

let id = 0;

function insertVlan() {
    let div = document.createElement("div");
    vlanForm.appendChild(div);

    //Span Vlan number
    let vlanNumber = document.createElement("span");
    vlanNumber.textContent="Vlan number:"
    div.appendChild(vlanNumber);

    //Field Vlan Number
    let inputVlanNumber = document.createElement("input");
    inputVlanNumber.type= "number"
    inputVlanNumber.style.width="50px"
    inputVlanNumber.name = "filter1"
    div.appendChild(inputVlanNumber);

    //Field Vlan Name
    let inputVlanName = document.createElement("input");
    inputVlanName.placeholder = "Vlan name";
    inputVlanName.name = "filter";
    div.appendChild(inputVlanName);

    document.getElementById("generateCode").style.display = "block";

    let vlan = {
        id: id += 1,
        vlanNumber:"",
        vlanName: "",
        interfaces: [],
    };
    myArray.push(vlan);


    console.log(myArray);
    let btnInterface = document.createElement("button");
    btnInterface.textContent = "Add interface";
    btnInterface.type = "button";
    btnInterface.style.margin = "5px"
    div.appendChild(btnInterface);
    let index = id;
    btnInterface.addEventListener("click", () => addInterface(index, div));
}


function addInterface(index, div) {
    console.log(index)

    let interfaceObj = {
        interfaceName: "",
        portMode: "",
    };

    for (let i = 0; myArray.length > i; i++) {
        if (myArray[i].id == index) {
            myArray[i].interfaces.push(interfaceObj);
        }
    }
    let inputInterface = document.createElement("input");
    inputInterface.placeholder = "Interface name";
    inputInterface.name = "interface";
    inputInterface.style.margin = "5px"
    div.appendChild(inputInterface);


    let switchPortModeEl = document.createElement("select");
    switchPortModeEl.id = "switchPortModeOption"
    switchPortModeEl.name = "swMd"
    div.appendChild(switchPortModeEl)

    //Option 1
    let option1 = document.createElement("option")
    option1.value = "Access";
    option1.textContent = "Access";
    switchPortModeEl.appendChild(option1)

    //Option 2
    let option2 = document.createElement("option")
    option2.value = "Trunk";
    option2.textContent = "Trunk";
    switchPortModeEl.appendChild(option2)

    //Option 3
    let option3 = document.createElement("option")
    option3.value = "Dynamic";
    option3.textContent = "Dynamic";
    switchPortModeEl.appendChild(option3)

    console.log(myArray);
    finalArray.push(myArray);
}

function generateCode() {

//Input em Vlan Name e Vlan Number

    let vlanNumber = document.getElementsByName("filter1");
    let vlanName = document.getElementsByName("filter");

    let vlanNumberArray = [];
    let vlanNameArray = [];
    for (let indexe = 0; vlanName.length > indexe; indexe++) {
        vlanNameArray.push(vlanName[indexe].value)
    }
    for (let indexe = 0; vlanNumber.length > indexe; indexe++) {
        vlanNumberArray.push(vlanNumber[indexe].value)
    }
    let numObj = myArray.length;
    for (let i = 0; i < myArray.length; i++) {
        //console.log("numObj" + numObj);
        let sliced1 = vlanNumberArray.slice(0, numObj);// a,b
        myArray[i].vlanNumber = sliced1[i];
        let sliced = vlanNameArray.slice(0, numObj);// a,b
        myArray[i].vlanName = sliced[i];
    }

    for (let indexed = 0; numObj > indexed; indexed++) {
        vlanNumberArray.shift();
        vlanNameArray.shift();
    }

//Input em SwitchPortMode
    let vlanSw = document.getElementsByName("swMd");
    let switchPortModeArray = [];
    for (let indexe = 0; vlanSw.length > indexe; indexe++) {
        //alert(vlanName[indexe].value)
        switchPortModeArray.push(vlanSw[indexe].value)
    }
    console.log(switchPortModeArray)


//Input em Interface Name
    let interfaceName = document.getElementsByName("interface");
    let interfaceNameArray = [];
    for (let indexe = 0; interfaceName.length > indexe; indexe++) {
        interfaceNameArray.push(interfaceName[indexe].value)
    }

    for (let i = 0; i < myArray.length; i++) {
        let numObj = myArray[i].interfaces.length; //2
        //console.log("numObj" + numObj);
        for (let ind = 0; numObj > ind; ind++) { //2
            let sliced2 = switchPortModeArray.slice(0, numObj);
            let sliced = interfaceNameArray.slice(0, numObj);// a,b
            myArray[i].interfaces[ind].interfaceName = sliced[ind];
            myArray[i].interfaces[ind].portMode = sliced2[ind];
        }
        for (let indexed = 0; numObj > indexed; indexed++) {
            switchPortModeArray.shift()
            interfaceNameArray.shift();
        }
    }
    console.log(myArray);
    generateText();
}

function generateText() {
    let divgeneratetext = document.getElementById("generateText");
    divgeneratetext.textContent="";
    divgeneratetext.style.display = "block";
    myArray.forEach(element => {

        let outVlanNumber = document.createElement("p");
        outVlanNumber.textContent = "switch(config)# vlan " + element.vlanNumber
        divgeneratetext.appendChild(outVlanNumber);

        let outVlanName = document.createElement("p");
        outVlanName.textContent = "switch(config-vlan)# name " + element.vlanName
        divgeneratetext.appendChild(outVlanName);

        element.interfaces.forEach(element => {
            let outInterfaceName = document.createElement("p");
            outInterfaceName.textContent = "switch(config-if)# interface " + element.interfaceName
            divgeneratetext.appendChild(outInterfaceName);

            let outSwitchPortMode = document.createElement("p");
            outSwitchPortMode.textContent = "switch(config-if)# switchport mode " + element.portMode
            divgeneratetext.appendChild(outSwitchPortMode);
        })


        console.log(element.vlanName)
    })

}


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
