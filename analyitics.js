function getUnique(array) {
  var uniqueArray = [];
  for (i = 0; i < array.length; i++) {
    if (uniqueArray.indexOf(array[i]) === -1) {
      uniqueArray.push(array[i]);
    }
  }
  return uniqueArray;
}

ips=['122.187.230.243','122.187.229.82','122.187.230.54','122.187.237.142','124.119.86.59','207.172.65.210','218.201.62.71']

ips_1 = getUnique(ips);
console.log(ips_1);