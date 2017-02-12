Function.prototype.bind2 = function(obj){
  return (...args) => {
    return this.apply(obj, args);
  };
};

const f1 = (function(a, b){
  return a + b + this.c;
}).bind2({c: 3});

// --------------------------------------------------------------- //

function add(...args){
  return args.reduce((a, c) => a + c, 0);
}

// --------------------------------------------------------------- //

const Promise = require('bluebird');

function dice(){
  return new Promise((res, rej) => {
    setTimeout(() => {
      const rnd = Math.floor(Math.random() * 6) + 1;
      res(rnd);
    }, 1)
  });
}

dice()
.then(d => {
  console.log(d);
  return 99;
})
.then(v => {
  console.log(v);
  return dice();
})
.then(d => {
  console.log(d);
  return 101;
})
.then(v => {
  console.log(v);
});

// --------------------------------------------------------------- //

Promise.resolve(3)
.then(v => {
  console.log(v);
})

// --------------------------------------------------------------- //

function compose(f1, f2){
  return (x) => f2(f1(x));
}

function square(n){
  return n * n;
}

function negate(n){
  return -n;
}

const ns = compose(square, negate);

console.log(ns(5));

// --------------------------------------------------------------- //
