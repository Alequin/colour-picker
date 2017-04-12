
function ColourSlab(element, radioButton){

  this.element = element;
  this.radioButton = radioButton;
  var checkedState = radioButton.checked;

  this.isChecked = function(){
    return checkedState;
  }

  this.setElementColour = function(colour){
    this.element.style.background = colour;
  }

  function setRadioButtonState(state){
    checkedState = state;
    radioButton.checked = checkedState;
  };

  radioButton.addEventListener("click", function(){
    setRadioButtonState(!checkedState);
  });
}

var redInput = document.forms["colour-picker-form"]["red"];
var greenInput = document.forms["colour-picker-form"]["green"];
var blueInput = document.forms["colour-picker-form"]["blue"];
var hexInput = document.forms["colour-picker-form"]["hex-colour-code"];
var submitButton = document.getElementById("submit");

var colourSlab1 = new ColourSlab(
  document.getElementsByClassName("background-colour-slab")[0],
  document.forms["colour-picker-form"]["slab-1-selector"]
);

var colourSlab2 = new ColourSlab(
  document.getElementsByClassName("background-colour-slab")[1],
  document.forms["colour-picker-form"]["slab-2-selector"]
);

var colourSlab3 = new ColourSlab(
  document.getElementsByClassName("background-colour-slab")[2],
  document.forms["colour-picker-form"]["slab-3-selector"]
);

var colourSlab4 = new ColourSlab(
  document.getElementsByClassName("background-colour-slab")[3],
  document.forms["colour-picker-form"]["slab-4-selector"]
);

function isRGBInputEmpty(){
  var redLength = redInput.value.length;
  var greenLength = greenInput.value.length;
  var blueLength = blueInput.value.length;
  return !(redLength > 0 || greenLength > 0 || blueLength > 0);
}

function isHexInputEmpty(){
  var hexLength = hexInput.value.length;
  return hexLength === 0;
}

function setRGBInput(red, green, blue){
  redInput.value = red === undefined ? "" : red;
  greenInput.value = green === undefined ? "" : green;
  blueInput.value = blue === undefined ? "" : blue;
}

function setHexInput(hexCode){
  hexInput.value = hexCode === undefined ? "" : hexCode;
}

function clearRGBInput(){
  setRGBInput("","","");
}

function clearHexInput(){
  setHexInput("");
}

function onClickRGBInputs(){
  if(!isHexInputEmpty()){
    clearHexInput();
  }
}

redInput.addEventListener("focus", function(){
  onClickRGBInputs();
});
blueInput.addEventListener("focus", function(){
  onClickRGBInputs();
});
greenInput.addEventListener("focus", function(){
  onClickRGBInputs();
});


hexInput.addEventListener("focus", function(){
  if(!isRGBInputEmpty()){
    clearRGBInput();
  }
});

function submitRGBInput(red, green, blue){
  if(!isRGBValid(red) || !isRGBValid(green) || !isRGBValid(blue)){
    alert("Sorry, the rgb value provided cannot be used. Please check the " +
          "numbers used: Red - "+red+" Green - "+green+" Blue - "+blue);
    return;
  }
  setSlabColours(getRGBString(red, green, blue));
  setHexInput(convertRGBToHex(red,green,blue));
}

function submitHexInput(hexCode){
  if(hexCode[0] !== "#"){
    hexCode = "#"+hexCode;
  }
  if(!isHexValid(hexCode)){
    alert("The given hex number is not valid: " + hexCode);
    return;
  }
  setSlabColours(hexCode);
  setRGBInput(
    convertHexToDecimal(hexCode.substr(1,2)),
    convertHexToDecimal(hexCode.substr(3,2)),
    convertHexToDecimal(hexCode.substr(5,2))
  )
}

function isRGBValid(colourNumber){
  return !(colourNumber < 0 || colourNumber > 255);
}

function isHexValid(hexCode){
  var searchResult = hexCode.search(/^#[a-f,A-F,0-9][a-f,A-F,0-9][a-f,A-F,0-9][a-f,A-F,0-9][a-f,A-F,0-9][a-f,A-F,0-9]$/);
  return searchResult === 0;
}

function convertRGBToHex(red, green, blue){
  return "#"+convertDecimalToHex(red)+""+convertDecimalToHex(green)+""+convertDecimalToHex(blue)
}

function convertDecimalToHex(decimal){

  var result = new Array();

  do{
    var divider = 0;
    var power = 1;
    do{
      power ++;
      divider = Math.pow(16, power);
    }while(divider < decimal);
    power --;
    divider = Math.pow(16, power);

    result.push(Math.floor(decimal / divider));

    var decimal = decimal % divider;

    if(decimal <= 15){
      result.push(decimal);
      break;
    }
  }while(true);

  for(var j=0; j<result.length; j++){
    if(result[j] >= 10){
      result[j] = String.fromCharCode("a".charCodeAt(0) + (result[j] - 10));
    }
  }

  return result.join("");
}

function convertHexToDecimal(hex){

  var result = 0;
  for(var j=0; j<hex.length; j++){
    var value = getHexDigitAsNumber(hex.charAt(j));
    result += value * Math.pow(16, hex.length-j-1);
  }

  return result;
}

function getHexDigitAsNumber(hexDigit){

  switch(hexDigit){

    case "a":
      return 10;

    case "b":
      return 11;

    case "c":
      return 12;

    case "d":
      return 13;

    case "e":
      return 14;

    case "f":
      return 15;

    default:
      return parseInt(hexDigit);
  }
}

function setSlabColours(colour){
  if(colourSlab1.isChecked()){
    colourSlab1.setElementColour(colour)
  }

  if(colourSlab2.isChecked()){
    colourSlab2.setElementColour(colour)
  }

  if(colourSlab3.isChecked()){
    colourSlab3.setElementColour(colour)
  }

  if(colourSlab4.isChecked()){
    colourSlab4.setElementColour(colour)
  }
}


function getRGBString(red, green, blue){
  return "rgb("+red+","+green+","+blue+")"
}

submitButton.addEventListener("click", function(){
  if(!isRGBInputEmpty()){
    submitRGBInput(redInput.value, greenInput.value, blueInput.value);
  }else{
    submitHexInput(hexInput.value);
  }
});
