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



// function delay(ms) {
//   return new Promise((resolve => setTimeout(resolve, ms)));
// }

// delay(3000).then(() => console.log('выполнилось через 3 секунды'));


// function sum(a, b){
//   return a + b;
// }


// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(um(4, 5));
//   }, 3000);
// });

// promise.then((velue) => {
//   console.log(velue);
// });
// promise.catch((velue) => {
//   console.log(new Error('error'));
// });


// const films = [
//   {
//       name: 'Titanic',
//       rating: 9
//   },
//   {
//       name: 'Die hard 5',
//       rating: 5
//   },
//   {
//       name: 'Matrix',
//       rating: 8
//   },
//   {
//       name: 'Some bad film',
//       rating: 4
//   }
// ];


// function setFilmsIds(arr) {
//   return arr.map((e, i) =>  {
//     e.id = i;
//     return e
//   });
// }

// const tranformedArray = setFilmsIds(films);

// function checkFilms(arr) {
//   return arr.every( e => {
//     if(e.id || e.id === 0){
//       return true;
//     }else{
//       return false;
//     }
//   })
// }

// console.log(checkFilms(tranformedArray));

// function showListOfFilms(arr) {
//   return arr.filter( e => e.name);
// }

// function showGoodFilms(arr) {
//   // let res = [];
//   // for(let i = 0; i < arr.length; i++){
//   //   if(arr[i].rating >= 8){
//   //     res.push(arr[i]);
//   //   }
//   // }
//   return arr.filter( i => {
//     if(i.rating >= 8){
//       return i;
//     }
//   });
// }


// function showListOfFilms(arr) {
//   const Arr = arr.map( e => e.name);
//   return Arr.reduce((res, str) => `${res}, ${str}`);
// }

// console.log(showListOfFilms(films));



// const funds = [
//   {amount: -1400},
//   {amount: 2400},
//   {amount: -1000},
//   {amount: 500},
//   {amount: 10400},
//   {amount: -11400}
// ];

// const getPositiveIncomeAmount = (data) => {
//   return data.filter(e => e.amount > 0).reduce((sum, e) => sum + e.amount, 0);
// };


// const getTotalIncomeAmount = (data) => {
//   if(data.some( e => e.amount < 0)){
//     return data.reduce((sum, num) => sum + num.amount, 0);
//   } else {
//     getPositiveIncomeAmount(data);
//   }
// };

// console.log(getTotalIncomeAmount(funds));

// function fusc(n){
//   let sum = 0;
//   if(n === 0){
//     sum =+ 0;
//   }else if(n === 1){
//     sum =+ 1;
//   } else if(n%2 === 0){
//     sum =+ fusc(n/2);
//   } else {
//     sum =+ fusc((n-1)/2) + fusc((n-1)/2 + 1);
//   }
//   return sum;
// }

// console.log(fusc(10156165535));
/////////////////////////////////////////////////////////////////////////////////////////////////
// function unique(arr) {
//   let sort = new Set(arr);
//   let res = [];
//   for (let key of sort){
//     res.push(key);
//   }
//   return res.join(', ');
// }

// let values = ["Hare", "Krishna", "Hare", "Krishna",
//   "Krishna", "Krishna", "Hare", "Hare", ":-O"
// ];

// console.log( unique(values) );

function unique(arr) {
  return Array.from(new Set(arr));
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

console.log( unique(values) );
////////////////////////////////////////////////////////////////////////////////////////

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

function clearArr(arr){
  // let sortArr = arr.map((e)=>{
  //   console.log(e.split("").sort().join(""));
  // })

  let map = new Map();

  for (let word of arr){
    let sorted = word.toLowerCase().split("").sort().join("");
    map.set(sorted, word);
  }
  console.log(map);
  return Array.from(map.values());
}

console.log(clearArr(arr));




let map = new Map();

map.set("name", "John");

let keys = Array.from(map.keys());


// Error: keys.push is not a function
// Ошибка: keys.push -- это не функция
keys.push("more");

console.log(keys);

