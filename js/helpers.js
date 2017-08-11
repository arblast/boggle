function randArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randArrayRemove(array) {
  let index = Math.floor(Math.random() * array.length);
  return array.splice(index,1)[0];
}

module.exports = {
  randArray,
  randArrayRemove
}
