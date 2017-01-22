var player2 = function(){
	this.collision = function(robot){
		console.log("player2 Collision State");
	}
	this.inView = function(robot){
		console.log("player2 viewed");
	}
	this.idle = function(robot){
		//console.log("player2 idle");
	}
	this.bulletHit = function(robot){
		console.log("player2 hit by Bullet");
	}
	this.wallHit = function(robot){
		console.log("player2 collides wall");
	}
}


