/*Hoisting, Scopes, and Closures in JavaScript */

/*Scope------------------------------------------------------------------
A scope in JavaScript defines what variables you have access to. There are two kinds of scope – global scope and local scope.

//Global scope-----------------------------------------------------------
If a variable is declared outside all functions or curly braces ({}),
it is said to be defined in the global scope.
-->Once you’ve declared a global variable, you can use that variable anywhere in your code,
even in functions.
*/

//Example-->
const hello = "Hello CSS TRICKS RENDER";

function sayHello() {
    //console.log(hello); //Hello CSS TRICKS RENDER
}

//console.log(hello); //Hello CSS TRICKS RENDER
sayHello();


///LOCALE SCOPE-------------------------------------------
//Variables that are usable only in a specific part of your code are considered to be in a local scope. 
//These variables are also called local variables.
///-->In JavaScript, there are two kinds of local scope: function scope and block scope.

//FUNCTION SCOPE-->----------------------------------
//When you declare a variable in a function, you can access this variable only within the function. You can’t get this variable once you get out of it.

//Example---
function sayHello() {
    const hello = 'Hello CSS-Tricks Reader!'
    // console.log(hello)
}

sayHello() // 'Hello CSS-Tricks Reader!'
// console.log(hello) // Error, hello is not defined



//BLOCK SCOPE--------------------------------------------------
//When you declare a variable with const or let within a curly brace ({}), 
//you can access this variable only within that curly brace.

{
    const hello = 'Hello CSS-Tricks Reader!'
    // console.log(hello) // 'Hello CSS-Tricks Reader!'
}

// console.log(hello) // Error, hello is not defined




///ask****Function hoisting and scopes----------------------------------

//Nested scopes-----------------------
/*When a function is defined in another function, the inner function has access to the outer function’s variables.
This behavior is called lexical scoping.
*/
//Example----->
function outerFunction() {
    const outer = `I'm the outer function!`

    function innerFunction() {
        const inner = `I'm the inner function!`
        // console.log(outer) // I'm the outer function!
    }

    // console.log(inner) // Error, inner is not defined
}



///*************************Closures **************************** */
//Whenever you create a function within another function, you have created a closure. 
//The inner function is the closure. 
//This closure is usually returned so you can use the outer function’s variables at a later time.
//Example---
function outerFunction() {
    const outer = `I see the outer variable!`

    return function innerFunction() {
        console.log(outer)
    }
}

outerFunction()() // I see the outer variable!


/*Since closures have access to the variables in the outer function, they are usually used for two things:

1-To control side effects
2-To create private variables

*/
//1.Controlling side effects with closures---->
function prepareCake(flavor) {
    return function () {
        setTimeout(_ => console.log(`Made a ${flavor} cake!`), 1000)
    }
}

const makeCakeLater = prepareCake('banana')

// And later in your code...
makeCakeLater()
// Made a banana cake!




//2.Private variables with closures----------
//As you know by now, variables created in a function cannot be accessed outside the function. 
//Since they can’t be accessed, they are also called private variables.

function secret(secretCode) {
    return {
        saySecretCode() {
            // console.log(secretCode)
        }
    }
}

const theSecret = secret('CSS Tricks is amazing')
theSecret.saySecretCode()
// 'CSS Tricks is amazing'


//*****************************IMP EXAMPLE FIRST**************************** */
function counterFactory() {
    // Return an object that has two methods called `increment` and `decrement`.
    // `increment` should increment a counter variable in closure scope and return it.
    // `decrement` should decrement the counter variable and return it.
    let counter = 5;
    let obj = {
        increment: () => {
            counter++
            console.log(counter);
        },
        decrement: () => {
            counter--
            console.log(counter);
        }
    }

    return obj;
}

let result = counterFactory();
result.increment();
result.increment();
result.decrement();
result.decrement();


//*****************************IMP EXAMPLE SECOND**************************** */
function limitFunctionCallCount(cb, n) {
    // Should return a function that invokes cb.
    // The returned function should only allow cb to be invoked n times.
    // Returning null is acceptable if cb can't be returned
    return function inner() {
        return function subInner() {
            if (n > 0) {
                n--;
                cb(n);
            } else {
                return 'null';
            }
        }();
    }
}

let result1 = limitFunctionCallCount((n) => {
    console.log("Hello", n)
}, 3);
result1();
result1();
result1();
result1();




//*****************************IMP EXAMPLE THIRD**************************** */

function cacheFunction(cb) {
    // Should return a funciton that invokes `cb`.
    // A cache (object) should be kept in closure scope.
    // The cache should keep track of all arguments have been used to invoke this function.
    // If the returned function is invoked with arguments that it has already seen
    // then it should return the cached result and not invoke `cb` again.
    // `cb` should only ever be invoked once for a given set of arguments.
    const obj = {};

    return function innerFunction(...args) {

        if (obj[args]) {
            return obj[args];
        } else {
            obj[args] = args;
            return cb(...args);
        }

    }
}

let result = cacheFunction((...args) => console.log(args));
result("hello", "hi");
result("hello", "hi");
result("hey", "Hello", "Hi");
