"use strict";

// Require the max-api module to connect to Max via node.script
const maxAPI = require("max-api");
var add = require('vectors/add')(2)
var pos = [0, 0]
var spd = [1, 1.5]
// When node.script gets the symbol "text", the remainder will be passed to this function.
// The "..." is  the spread operator. All of the arguments to this function will go into args as an array.

maxAPI.addHandler("text1", (...args) => {
// The outlet function sends the arguments right back to Max. Hence, echo.
	maxAPI.outlet(...args);
});

maxAPI.addHandler("textRoute", (...args) => {
	add(pos, spd)
	// The outlet function sends the arguments right back to Max. Hence, echo.
	//maxAPI.outlet("textRouteOutput", ...args);
	maxAPI.outlet("textRouteOutput",...args);
});

maxAPI.addHandler("addVector", (...arg) => {
    var pos = [0, 0]
    var spd = [1, 1.5]
    add(pos, spd)
    add(pos, spd)
    maxAPI.outlet(pos);
    maxAPI.outlet("addVectorsOutput",...pos);
});

maxAPI.addHandler("addVectorParam", (...arg) => {
    var pos = [arg[1], arg[2]];
    var spd = [arg[3], arg[4]];
    console.log(arg[1]);
    console.log(arg[2]);
    console.log(arg[3]);
    console.log(arg[4]);
    add(pos, spd)
    add(pos, spd)
    maxAPI.outlet(...pos);
    maxAPI.outlet("addVectorParamOutput",...pos);
});

