const Request = require('request');
const Promise = require('bluebird');
const R = require('ramda');

// #1
// curry
const multiply = (a, b) => a * b;
const mul = R.curry(multiply);
const mul3 = mul(3);
const mul5 = mul(5);
console.log(mul3(8), mul5(7));
// -------------------------------------------------------------------- //

// #2
// range, curry, compose, map
const countFrom10 = R.range(10);
const numbers1 = countFrom10(25);
const add = R.curry((a, b) => a + b);
const add2 = add(2);
const a2m3 = R.compose(add2, mul3);
const numbers2 = R.map(a2m3, numbers1);
console.log(numbers2);
// -------------------------------------------------------------------- //

// #3
// tap, prop, pipeP

function request(url){
  return new Promise((resolve, reject) => {
    Request(url, {json: true}, (x, y, body) => {
      resolve(body);
    });
  });
}

const url = 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=AAPL';
const _print = s => console.log('out:', s);
const print = R.tap(_print);
const lp = R.prop('LastPrice');

const x = R.pipeP(request, lp, print, a2m3, print);
x(url);

// -------------------------------------------------------------------- //
