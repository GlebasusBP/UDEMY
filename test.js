"use strict";

function foo() {console.log(this);}

foo(null);


function getThis(){
  return this;
}

console.log(message);
let message = 'hello';





class User {
  constructor(name, age){
    this.name = name;
    this._age = age;
  }

  #privateName = 'Lopuh'; // приватное свойство (инкапсуляция)

  say(){
      console.log(`User's name: ${this.name} ${this.#privateName}, age: ${this._age}`)  
  }

  get age(){
    return this._age;
  }

  set age(num){
    if(typeof num === 'number' && num > 0 && num < 110){
      this._age = num;
    } else {
      console.log(`Data is not correct`);
    }
  }
}

const Ivan = new User('Ivan', 30);
console.log(Ivan.age);
Ivan.age = 90;
console.log(Ivan.age);
Ivan.say();