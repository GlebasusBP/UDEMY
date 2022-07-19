// function Animal(type, legs) {
//   this.type = type;
//   this.legs = legs;
//   this.logInfo = function() {
//     console.log(this === myCat); // => false
//     console.log('The ' + this.type + ' has ' + this.legs + ' legs');
//   };
// }
// var myCat = new Animal('Cat', 4);
// // logs "The undefined has undefined legs"
// // or throws a TypeError, in strict mode
// console.log(myCat);
// setTimeout(myCat.logInfo.bind(myCat), 1000);



function delay(ms) {
  return new Promise((resolve => setTimeout(resolve, ms)));
}

delay(3000).then(() => console.log('выполнилось через 3 секунды'));


function sum(a, b){
  return a + b;
}


let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(um(4, 5));
  }, 3000);
});

promise.then((velue) => {
  console.log(velue);
});
promise.catch((velue) => {
  console.log(new Error('error'));
});
