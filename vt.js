const https = require('https');
zlib = require('zlib');
const fs = require('fs');

fs.unlink('ips/output.json', (err) => {
  if (err) {
    console.error(err);
    return;
  }
});

let n = 0;
function qt() {
  fs.writeFile('ips/output.json', "}}", { flag: "a+" }, (err) => {
    if (err) throw err;
    //console.log('Data written to file');
  });
}

async function vt(ip1) {
  const ip = ip1;
  const ipcheck = '/ui/ip_addresses/' + ip;
  // fs.writeFile('output.json', "\n" + ip + "\n", { flag: "a+" }, (err) => {
  //   if (err) throw err;
  //   console.log('Data written to file');
  // });
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  // var tmlp = random(16564234690, 16564239690);

  var char = random(97, 122);
  // var last_num = random(350, 550);
  let char_1 = String.fromCharCode(char);
  // var decodedStringBtoA = tmlp + "-ZG9udCB" + char_1 + "ZtBldmls-1681758061." + last_num;
  // var encodedStringBtoA = "'" + btoa(decodedStringBtoA) + "'";
  var encodedStringBtoA = 'MTQ3MTY0ODE0NjctWkc5dWRDQmlaU0JsZG1scy0xNjgxNTkwNjIzLjUz'+ char_1
  console.log(encodedStringBtoA);
  const options = {
    hostname: 'www.virustotal.com',
    path: ipcheck,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
      'Accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate',
      'Referer': 'https://www.virustotal.com/',
      'Content-Type': 'application/json',
      'X-Tool': 'vt-ui-main',
      'X-App-Version': 'v1x169x1',
      'Accept-Ianguage': 'en-US,en;q=0.9,es;q=0.8',
      'X-Vt-Anti-Abuse-Header': encodedStringBtoA,
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'Te': 'trailers'
    }
  };
  function at() {
    return new Promise((resolve, reject) => {
      var request = https.get(options, (res) => {
        var buffers = [];

        res.pipe(zlib.createGunzip()).on('data', function (chunk) {
          buffers.push(chunk);
        }).on('end', function () {
          const data = Buffer.concat(buffers).toString();
          var buf = Buffer.from(JSON.stringify(data))
          const jsonData = JSON.parse(data);

          // Access the specific object you want to display
          var specificObject = jsonData.data.attributes.last_analysis_stats;
          var buf = Buffer.from(JSON.stringify(specificObject))
          n = n + 1;
          if (n == ips.length) {
            // Display the specific object
            console.log(specificObject);
            let opData = '"' + ip + '":' + "\n" + buf + "\n";
            fs.writeFile('ips/output.json', opData + "\r\n}}", { flag: "a+" }, (err) => {
              if (err) throw err;
              console.log('Data written to file');
            });
          } else {

            // Display the specific object
            console.log(specificObject);
            let opData = '"' + ip + '":' + "\n" + buf + ",\n";
            fs.writeFile('ips/output.json', opData + "\r\n", { flag: "a+" }, (err) => {
              if (err) throw err;
              console.log('Data written to file');
            });
          }
        });

        // console.log('statusCode:', res.statusCode);
        // console.log('headers:', res.headers);

        // res.on('data', (d) => {
        //   process.stdout.write(d);
        // });
      }).on('error', (e) => {
        console.error(e);
      });
    });

  }
  await at();


}
const filename = 'iplist.txt';
let ips = [];
fs.readFile(filename, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  ips = data.split(",");
});

// function getUnique(array) {
//   var uniqueArray = [];
//   for (i = 0; i < array.length; i++) {
//     if (uniqueArray.indexOf(array[i]) === -1) {
//       uniqueArray.push(array[i]);
//     }
//   }
//   return uniqueArray;
// }
// ips_1 = getUnique(ips);
// console.log(ips_1);



function asn() {
  // setTimeout(() => {
  //   ips.forEach(async element => {
  //     setTimeout(() => {
  //       vt(element);
  //     }, 2000);
  //   });
  // }, 2000);
  
  var intervalId = setInterval(vt(element), 1200);
  setTimeout(function() {
    clearInterval(intervalId);
  }, 10000);
}
fs.writeFile('ips/output.json', '{"ipAddresses": {', { flag: "a+" }, (err) => {
  if (err) throw err;
  //console.log('Data written to file');
});
asn()

