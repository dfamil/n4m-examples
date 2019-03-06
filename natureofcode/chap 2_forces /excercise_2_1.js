"use strict";

// Require the max-api module to connect to Max via node.script
const maxAPI = require("max-api");
var Victor = require("../../node_modules/victor");
// const random = require("../../node_modules/random");

// var location1 = new Victor(random.float(0, 600), random.float(0, 200));
// var velocity1 = new Victor(random.float( -2, 2), random.float(-2, 2));
var location1 = new Victor(30, 30);
var velocity1 = new Victor(0, 0);
var  acceleration1 = new Victor(0, 0);
var wind = new Victor(0.01, 0);
var  gravity = new Victor(0, 0.1);
var multi = new Victor(0, 0);
var mass1 = new Victor(1, 1);
class Mover {
	constructor(location, velocity, width, height, acceleration, mass)
	{
		this.acceleration = acceleration;
		this.location = location;
		this.velocity = velocity;
		this.width = width;
		this.height = height;
		this.mass = mass;
	}
	applyForce(force) {
		force.divide(this.mass);
		console.log("f = ", force.x, force.y);
		this.acceleration.add(force);
		// console.log("acceleration vector1", this.acceleration.x, this.acceleration.y);

	}

	update()
	{
		this.velocity.add(this.acceleration);
		this.location.add(this.velocity);
		this.acceleration.multiply(multi);
	}


	display()
	{
		maxAPI.outlet("newLocationOutput", this.location.x, this.location.y);
	}

	checkEdges() {

		if (this.location.x > this.width) {
			this.location.x = this.width;
			this.velocity.x *= -1;
		} else if (this.location.x < 0) {
			this.velocity.x *= -1;
			this.location.x = 0;
		}
		if (this.location.y > this.height) {
			this.velocity.y *= -1;
			this.location.y = this.height;
		}
	}
}


maxAPI.addHandler("motion", (...args) =>
{
	var mover = new Mover();
	mover.width = 600;
	mover.height = 400;
	mover.location = location1;
	mover.mass = mass1;
	mover.velocity = velocity1;
	mover.acceleration = acceleration1;
	mover.applyForce(wind);
	mover.applyForce(gravity);
	mover.update();
	mover.display();
	mover.checkEdges();


});

