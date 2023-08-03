const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  var tmlp = random(16564234690, 16564239690);


var char = random(97, 122);
  var last_num = random(350, 550);
  let char_1 = String.fromCharCode(char);
  var decodedStringBtoA = tmlp+"-ZG9udCB"+char_1+"ZtBldmls-1681758061."+last_num;
  var encodedStringBtoA = "'"+btoa(decodedStringBtoA)+"'";
  console.log(encodedStringBtoA);