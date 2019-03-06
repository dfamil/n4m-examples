"use strict";

// Require the max-api module to connect to Max via node.script
const maxAPI = require("max-api");
var Victor = require("../../node_modules/victor");
// const random = require("random");
var width1 = 600;
var height1 = 400;
var location1 = new Victor(width1 / 2, height1 / 2 );
var velocity1 = new Victor(0, 0);
var acceleration1 = new Victor(0, 0);
var multi = new Victor(0.2, 0.2);

class Mover {
	constructor(location, velocity, width, height, mouse, acceleration,topspeed)
	{
		this.location = location;
		this.velocity = velocity;
		this.width = width;
		this.height = height;
		this.mouse = mouse;
		this.acceleration = acceleration;
		this.topspeed = topspeed;
	}
	update()
	{
		// console.log("update vector", this.location.x, this.location.y);
		// Compute a vector that points from location to mouse
		this.acceleration = this.mouse.subtract(this.location);	
		console.log("mouse vector", this.mouse.x, this.mouse.y);
		console.log("acceleration vector1", this.acceleration.x, this.acceleration.y);	
		// Set magnitude of acceleration
		// this.acceleration.setMag(0.2);
		this.acceleration.normalize();
		console.log("acceleration vector2", this.acceleration.x, this.acceleration.y);
		this.acceleration.multiply(multi);
		console.log("acceleration vector3", this.acceleration.x, this.acceleration.y);
		// Velocity changes according to acceleration
		this.velocity.add(this.acceleration);
		// Limit the velocity by topspeed
		this.velocity.limit(this.topspeed);
		// Location changes by velocity
		this.location.add(this.velocity);
		// console.log("display vector", this.location.x, this.location.y);	
	}

	display()
	{	
		maxAPI.outlet("newLocationOutput", this.location.x, this.location.y);
	}

	checkEdges() {

		if (this.location.x > this.width) {
			this.location.x = 0;
		}
		else if (this.location.x < 0) {
			this.location.x = this.width;
		}
		if (this.location.y > this.height) {
			this.location.y = 0;
		}
		else if (this.location.y < 0) {
			this.location.y = this.height;
		}
	}
}
maxAPI.addHandler("motion", (...args) =>
{
	if(args[1]) {
		console.log("mouse vector", args[0], args[1]);
		maxAPI.outlet("magVectorOutput", args[0], args[1]);
		var mover = new Mover();
		mover.width = width1;
		mover.height = height1;
		mover.mouse = new Victor(args[0], args[1]);
		mover.location = location1;
		mover.velocity = velocity1;
		mover.acceleration = acceleration1;
		mover.topspeed = 6;
		mover.update();
		mover.checkEdges();
		mover.display();
		// maxAPI.outlet("magVectorOutput",magOutput);
	}
});

