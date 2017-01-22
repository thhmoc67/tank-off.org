//CHECK IF USER FUNCTIONS EXIST
var game = function () {
	this.frames = {};
	this.players = players;
	this.loopCount;
	this.robots = [];
	this.bullets = [{}, {}];
	this.arena;
	this.gameLength = 1000;
	this.loadedScripts = 0;
	this.winner = -1;
	this.init = function () {

		this.arena = new arena();
		this.arena.init();
		this.robots[0].init(0);
		this.robots[1].init(1);
		
		this.loopCount = 0;
		var i;
		for (i = 0; i < this.gameLength; i++) {
			if (this.gameLoop()) {
				break;
			}
		}
		this.frames.loopCount = this.loopCount;
		this.frames.winner = this.winner;
		this.saveGame();		
	}
	this.saveGame = function(){
		
		sendObj = {
			"fightid":fight_id,
			"winner":this.winner,
			"savedata":JSON.stringify(this.frames)
		};
		
		
		$.post("savegame.php",sendObj,function(data){window.close();});
	}
	this.gameLoop = function () {
		if (this.robots[0].health <= 0 && this.robots[1].health <= 0) {
			this.winner = 2;
			return 1;
		} else if (this.robots[0].health <= 0) {
			this.winner = 1;
			return 1;
		} else if (this.robots[1].health <= 0) {
			this.winner = 0;
			return 1;
		}

		if (checkCollisionPoly(this.robots[0].toCoods(), this.robots[1].toCoods())) {
			
			var robStates = [{}, {}];

			robStates[0] = this.robots[0].state();
			robStates[0].enemy = this.robots[1].enemyState();

			robStates[1] = this.robots[1].state();
			robStates[1].enemy = this.robots[0].enemyState();
			


				if(!isUndefined(this.robots[0].funcs.collision)){
					this.robots[0].clearCmds();
					try{
						this.robots[0].funcs.collision(robStates[0]);
					}
					catch(e){
						this.robots[0].errorcode(e,0);
					}
					
				}
				
				if(!isUndefined(this.robots[1].funcs.collision)){
					this.robots[1].clearCmds();
					try{
						this.robots[1].funcs.collision(robStates[1]);
					}
					catch(e){
						this.robots[1].errorcode(e,1);
					}
				}
		}
		
		
		var i = 0;

		for (i = 0; i < 2; i++) {

			var enemy = (i + 1) % 2;

			var robStates = this.robots[i].state();
			

			if (checkCollisionPoly(this.robots[enemy].toCoods(), this.robots[i].fieldOfView())) {
				//Viewed enemy
				try{
					if(!isUndefined(this.robots[i].funcs.inView)){
						this.robots[i].clearCmds();
						robStates.enemy = this.robots[enemy].enemyState();
						this.robots[i].funcs.inView(robStates);
					}
				}
				catch(e){
					this.robots[i].errorcode(e,i);
				}
				
			} else if (this.robots[i].wallCollision()) {

				try{
						
					if(!isUndefined(this.robots[i].funcs.wallHit)){
						this.robots[i].clearCmds();
						this.robots[i].funcs.wallHit(robStates);
					}
				}
				catch(e){
					this.robots[i].errorcode(e,i);
					
				}
			}
			
			var bArray = Object.keys(this.bullets[enemy]);
			var it = 0;
			for(it = 0;it<bArray.length;it++){
				
				var eBullet;
				eBullet = bArray[it];
				
				if (checkCollisionPoly(this.bullets[enemy][eBullet].toCoods(), this.robots[i].toCoods())) {
					
					
					
					this.robots[i].gotHit(this.bullets[enemy][eBullet].damage);
					delete this.bullets[enemy][eBullet];
					robStates.health = this.robots[i].health;
					try{
						if(!isUndefined(this.robots[i].funcs.bulletHit)){
							this.robots[i].clearCmds();
							this.robots[i].funcs.bulletHit(robStates);
						}
					}
					catch(e){
					this.robots[i].errorcode(e,i);
						
					}
					break;
				}
			}
			
			
			if (this.robots[i].countQ() == 0) {
				
				if(!isUndefined(this.robots[i].funcs.idle)){
					try{
						this.robots[i].clearCmds();
						this.robots[i].funcs.idle(robStates);
					}
					catch(e){
						this.robots[i].errorcode(e,i);
						
					}
				}
			}

			
		}
		
		
		

		for (i = 0; i < 2; i++) {
			this.robots[i].rotate();
			this.robots[i].rotateCannonExec();
			this.robots[i].move();
			this.fireBullet(i);
			
				//TODO remove comments
				for (b in this.bullets[i]) {
					
				if (!this.bullets[i][b].move()) {
					delete this.bullets[i][b];
				}
			}
		}
		this.frames[this.loopCount] = new gameState();
		this.frames[this.loopCount].init(this.robots, this.bullets);
		this.loopCount++;
		return 0;
	}
	this.fireBullet = function (p) {
		if (this.robots[p].bulletQ.count == 0) {
			return;
		}
		if (this.loopCount < this.robots[p].lastBullet + this.robots[p].reloadTime) {
			return;
		}
		this.robots[p].lastBullet = this.loopCount;
		this.robots[p].bulletQ.deq();
		
		
		i = 0;
		while (true){
			if(isUndefined(this.bullets[p][i])){
				break;
			}
			else{
				i++;
			}
		}
		
		
		
		this.bullets[p][i] = new bullet();
		this.bullets[p][i].angle = this.robots[p].cannonAngle;
		//var tempx,tempy;
		
		//TODO:Fix this
		
		var argh = this.bullets[p][i].toCoods();
		//console.log(argh);
		/*
		var effXLen = Math.cos((Math.PI * (this.bullets[p][i].angle + 90)) / 180) * (25) * 0;
		var effYLen = Math.sin((Math.PI * (this.bullets[p][i].angle)) / 180) * (10) * 0;
		
		
		//tempx = Math.round(Math.cos(this.robots[p].cannonAngle * Math.PI / 180) * 25 + tempx);
		//tempy = Math.round(Math.sin(this.robots[p].cannonAngle *  Math.PI / 180) * 25 + tempy);
				
				
				
		this.bullets[p][i].x = this.robots[p].x + (effXLen/2);
		this.bullets[p][i].y = this.robots[p].y + (effYLen/2);
		
		*/
				
		this.bullets[p][i].x = Math.round(this.robots[p].x + (argh[0].x + argh[3].x)/2);
		this.bullets[p][i].y = Math.round(this.robots[p].y + (argh[0].y + argh[3].y)/2);
		
		
		this.bullets[p][i].firedBy = p;
		
	}
}
var gameState = function () {
	this.gs = {
		"tanks" : [{}, {}

		],
		"bullets" : [{}, {}

		]
	};
	this.init = function (r, b) {
		var i = 0;
		var j = 0;
		var k = 0;
		var x;
		for (i = 0; i < 2; i++) {
			this.gs.tanks[i].x = r[i].x;
			this.gs.tanks[i].y = r[i].y;
			this.gs.tanks[i].tA = r[i].tankAngle;
			this.gs.tanks[i].cA = r[i].cannonAngle;
			this.gs.tanks[i].h = r[i].health;
			
			j = Object.keys(b[i]);
			
			for(k = 0;k<j.length;k++){
				this.gs.bullets[i][j[k]] = {};
				this.gs.bullets[i][j[k]].x = b[i][j[k]].x;
				this.gs.bullets[i][j[k]].y = b[i][j[k]].y;
				this.gs.bullets[i][j[k]].a = b[i][j[k]].angle;
			}
			
		}
	}
	this.getStr = function () {
		return JSON.stringify(this.gs);
	}
};
var bullet = function () {
	this.firedBy = -1;
	this.moveSpeed = 10;
	this.x = 0;
	this.y = 0;
	this.xlen = 10;
	this.ylen = 6;
	this.angle = 0;
	this.arenaWidth = 500;
	this.arenaHeight = 300;
	this.damage = 12;

	this.toCoods = function () {
		var a = [{x : 0,y : 0}, {x : 0,y : 0}, {	x : 0,y : 0	}, {x : 0,y : 0}];

		var x1,y1,x2,y2;

		x1 = this.x + this.xlen / 2;
		y1 = this.y + this.ylen / 2;
		x2 = x1 - this.x;
		y2 = y1 - this.y;
		a[0].x = x2 * Math.cos(this.angle * Math.PI / 180) + y2 * Math.sin(this.angle * Math.PI / 180) + this.x;
		a[0].y = x2 * Math.sin(this.angle * Math.PI / 180) + y2 * Math.cos(this.angle * Math.PI / 180) + this.y;

		x1 = this.x - this.xlen / 2;
		y1 = this.y + this.ylen / 2;
		x2 = x1 - this.x;
		y2 = y1 - this.y;
		a[1].x = x2 * Math.cos(this.angle) + y2 * Math.sin(this.angle) + this.x;
		a[1].y = x2 * Math.sin(this.angle) + y2 * Math.cos(this.angle) + this.y;

		x1 = this.x - this.xlen / 2;
		y1 = this.y - this.ylen / 2;
		x2 = x1 - this.x;
		y2 = y1 - this.y;
		a[2].x = x2 * Math.cos(this.angle) + y2 * Math.sin(this.angle) + this.x;
		a[2].y = x2 * Math.sin(this.angle) + y2 * Math.cos(this.angle) + this.y;

		x1 = this.x + this.xlen / 2;
		y1 = this.y - this.ylen / 2;
		x2 = x1 - this.x;
		y2 = y1 - this.y;
		a[3].x = x2 * Math.cos(this.angle) + y2 * Math.sin(this.angle) + this.x;
		a[3].y = x2 * Math.sin(this.angle) + y2 * Math.cos(this.angle) + this.y;

		return a;

	}
	this.move = function () {
		
		
		
		this.x = Math.round(Math.cos(this.angle * Math.PI / 180) * this.moveSpeed + this.x);
		this.y = Math.round(Math.sin(this.angle * Math.PI / 180) * this.moveSpeed + this.y);
		
		
		
		
		if (this.x > (this.arenaWidth + this.xlen) || this.x < -this.xlen || this.y < -this.ylen || this.y > (this.arenaHeight + this.ylen)) {
			return 0;
		}

		return 1;
	}
}
var rState = Object.freeze({
		"idle" : 1,
		"collision" : 2,
		"hitwall" : 3,
		"hurt" : 4,
		"viewed" : 5
	});
var robot = function () {
	this.xlen = 40;
	this.ylen = 40;
	this.x = 0;
	this.y = 0;
	this.tankAngle = 0;
	this.cannonAngle = 0;
	this.health = 0;
	this.moveQ = new queue();
	this.bulletQ = new queue();
	this.rotateQ = new queue();
	this.rotateCannonQ = new queue();
	this.moveSpeed = 5;
	this.rotateSpeed = 5;
	this.state = rState.idle;
	this.lastBullet = -999;
	this.reloadTime = 5;
	this.arenaWidth = 500;
	this.arenaHeight = 300;
	this.stateFlag;
	this.funcs = {};
	this.wc = 0;
	this.cannonXLen = 25;
	this.cannonYLen = 10;
	this.fovXLen = 1000;

	
	this.errorcode = function(e,i){
				
		sendObj = {
			"fightid":fight_id,
			"winner":-9,
			"savedata":player_ids[i],
			"player_id":player_ids[i],
			"e_msg":e.message
			
		};
		$.post("savegame.php",sendObj,function(data){window.close(window.close());});
		g.loopCount = 9999;
		
		
	}
	
	this.state = function(){
		var obj = {};
		obj.x = this.x;
		obj.y = this.y;
		obj.tankAngle = this.tankAngle;
		obj.cannonAngle = this.cannonAngle;
		obj.health = this.health;
		
		obj.fire = this.fire;
		obj.forward = this.forward;
		obj.backward = this.backward;
		obj.rotateTank = this.rotateTank;
		obj.rotateCannon = this.rotateCannon;
		
		obj.bulletQ = this.bulletQ;
		obj.moveQ = this.moveQ;
		obj.rotateQ = this.rotateQ;
		obj.rotateCannonQ = this.rotateCannonQ;
		
		return obj;
	}
	
	this.enemyState = function(){
		var obj = {};
		obj.x = this.x;
		obj.y = this.y;
		obj.tankAngle = this.tankAngle;
		obj.cannonAngle = this.cannonAngle;
		obj.health = this.health;
		return obj;
	}
	
	this.gotHit = function (damage) {
		console.log("GOT HITTT");
		this.health = this.health - damage;
	}
	this.fieldOfView = function () {
		var a = [{	x : 0,y : 0}, {x : 0,y : 0}, {x : 0,y : 0}, {x : 0,y : 0}];
		var x1,		y1,		x2,		y2;
		
		
		x1 = this.x;
		y1 = this.y;
		
		var xd,yd,hypo;
		
		xd = Math.round(Math.cos(this.cannonAngle * Math.PI / 180) * 1000  + x1);
		yd = Math.round(Math.sin(this.cannonAngle * Math.PI / 180) * 1000 + y1);
		
		
		
		a[0].x = Math.round(Math.cos(Math.PI / 2) * 3  + x1);
		a[0].y = Math.round(Math.sin(Math.PI / 2) * 3  + y1);
		
		
		a[3].x = Math.round(Math.cos(Math.PI / 2) * 3  + xd);
		a[3].y = Math.round(Math.sin(Math.PI / 2) * 3  + yd);
		
		
		a[2].x = Math.round(Math.cos(3 * Math.PI / 2) * 3  + x1);
		a[2].y = Math.round(Math.sin(3 * Math.PI / 2) * 3  + y1);
		
		
		a[1].x = Math.round(Math.cos(3 * Math.PI / 2) * 3  + x1);
		a[1].y = Math.round(Math.sin(3 * Math.PI / 2) * 3  + y1);
		console.log(a,x1,y1,xd,yd);
		
		return a;
	}
	this.clearCmds = function () {
		this.moveQ.clear();
		this.rotateQ.clear();
		this.bulletQ.clear();
		this.rotateCannonQ.clear();
	}
	this.toCoods = function () {
		var a = [{x : 0,y : 0	}, {x : 0,y : 0}, {x : 0,	y : 0}, {x : 0,y : 0	}];

		var x1,
		y1,
		x2,
		y2;

		x1 = this.x + this.xlen / 2;
		y1 = this.y + this.ylen / 2;
		x2 = x1 - this.x;
		y2 = y1 - this.y;
		a[0].x = x2 * Math.cos(this.tankAngle * Math.PI / 180) + y2 * Math.sin(this.tankAngle * Math.PI / 180) + this.x;
		a[0].y = x2 * Math.sin(this.tankAngle * Math.PI / 180) + y2 * Math.cos(this.tankAngle * Math.PI / 180) + this.y;

		x1 = this.x - this.xlen / 2;
		y1 = this.y + this.ylen / 2;
		x2 = x1 - this.x;
		y2 = y1 - this.y;
		a[1].x = x2 * Math.cos(this.tankAngle * Math.PI / 180) + y2 * Math.sin(this.tankAngle * Math.PI / 180) + this.x;
		a[1].y = x2 * Math.sin(this.tankAngle * Math.PI / 180) + y2 * Math.cos(this.tankAngle * Math.PI / 180) + this.y;

		x1 = this.x - this.xlen / 2;
		y1 = this.y - this.ylen / 2;
		x2 = x1 - this.x;
		y2 = y1 - this.y;
		a[2].x = x2 * Math.cos(this.tankAngle * Math.PI / 180) + y2 * Math.sin(this.tankAngle * Math.PI / 180) + this.x;
		a[2].y = x2 * Math.sin(this.tankAngle * Math.PI / 180) + y2 * Math.cos(this.tankAngle * Math.PI / 180) + this.y;

		x1 = this.x + this.xlen / 2;
		y1 = this.y - this.ylen / 2;
		x2 = x1 - this.x;
		y2 = y1 - this.y;
		a[3].x = x2 * Math.cos(this.tankAngle * Math.PI / 180) + y2 * Math.sin(this.tankAngle * Math.PI / 180) + this.x;
		a[3].y = x2 * Math.sin(this.tankAngle * Math.PI / 180) + y2 * Math.cos(this.tankAngle * Math.PI / 180) + this.y;
		return a;
	}
	this.countQ = function () {
		return this.moveQ.count + this.rotateQ.count + this.rotateCannonQ.count + this.bulletQ.count;
	}
	this.wallCollision = function () {
		//Concern:Verify
		var tAngleMod = (this.tankAngle + 45) % 90;

		if (tAngleMod > 45) {
			tAngleMod = 90 - tAngleMod;
		}

		var effXLen = Math.cos((Math.PI * tAngleMod) / 180) * Math.sqrt(2) * (this.xlen / 2);
		var effYLen = Math.cos((Math.PI * tAngleMod) / 180) * Math.sqrt(2) * (this.ylen / 2);

		if (this.arenaWidth - effXLen <= this.x) {
			this.x = this.arenaWidth - effXLen;
			this.wc = 1;
		} else if (this.x <= effXLen) {
			this.x = effXLen;
			this.wc = 1;
		} else {
			this.wc = 0;
		}

		if (this.arenaHeight - effYLen <= this.y) {
			//Wall collision on Y Axis
			this.y = this.arenaHeight - effYLen;
			this.wc = 1;
		} else if (this.y <= effYLen) {
			this.y = effYLen;
			this.wc = 1;
		} else {
			this.wc = 0;
		}

		return !!this.wc;
	}
	this.move = function () {
		var moveCmd = this.moveQ.get();
		var directionFlag = 1;
		if (moveCmd.cmd == "backward") {
			directionFlag = -1;
		}

		if (moveCmd != 0) {
			var moveQuantity = this.moveSpeed;
			if (moveQuantity > moveCmd.steps) {
				moveQuantity = moveCmd.steps;
			}
			this.x = Math.round(Math.cos(this.tankAngle * Math.PI / 180) * moveQuantity * directionFlag + this.x);
			this.y = Math.round(Math.sin(this.tankAngle * Math.PI / 180) * moveQuantity * directionFlag + this.y);

			this.wallCollision();

			moveCmd.steps -= moveQuantity;
			if (moveCmd.steps == 0) {
				this.moveQ.deq();
			} else {
				this.moveQ.set(moveCmd);
			}

		}
	}
	this.rotate = function () {
		var rotateTankCmd = this.rotateQ.get();
		if (rotateTankCmd != 0) {
			var rotateTankQuantity = this.rotateSpeed;
			if (rotateTankQuantity > Math.abs(rotateTankCmd.rotDeg)) {
				rotateTankQuantity = Math.abs(rotateTankCmd.rotDeg);
			}

			this.tankAngle += rotateTankQuantity * (Math.abs(rotateTankCmd.rotDeg) / rotateTankCmd.rotDeg);

			this.cannonAngle += rotateTankQuantity * (Math.abs(rotateTankCmd.rotDeg) / rotateTankCmd.rotDeg);

			rotateTankCmd.rotDeg -= rotateTankQuantity * (Math.abs(rotateTankCmd.rotDeg) / rotateTankCmd.rotDeg);
			if (rotateTankCmd.rotDeg == 0) {
				this.rotateQ.deq();
			} else {
				this.rotateQ.set(rotateTankCmd);
			}
		}
	}
	this.rotateCannonExec = function () {
		var rotateCannonCmd = this.rotateCannonQ.get();
		if (rotateCannonCmd != 0) {
			var rotateCannonQuantity = this.rotateSpeed;
			if (rotateCannonQuantity > Math.abs(rotateCannonCmd.rotDeg)) {
				rotateCannonQuantity = Math.abs(rotateCannonCmd.rotDeg);
			}

			this.cannonAngle += rotateCannonQuantity * (Math.abs(rotateCannonCmd.rotDeg) / rotateCannonCmd.rotDeg);

			rotateCannonCmd.rotDeg -= rotateCannonQuantity * (Math.abs(rotateCannonCmd.rotDeg) / rotateCannonCmd.rotDeg);
			if (rotateCannonCmd.rotDeg == 0) {
				this.rotateCannonQ.deq();
			} else {
				this.rotateCannonQ.set(rotateCannonCmd);
			}
		}
	}
	this.coodsToXY = function (a) {
		x = (a[0].x + a[2].x) / 2;
		y = (a[0].y + a[2].y) / 2;
		return {
			"x" : x,
			"y" : y
		};
	}
	this.init = function (index) {
		this.health = 100;
		if (index == 0) {
			this.x = 50;
			this.y = 100;
			this.tankAngle = 0;
			this.cannonAngle = 0;
		} else {
			this.x = 450;
			this.y = 200;
			this.tankAngle = 180;
			this.cannonAngle = 180;
		}
		this.stateFlag = 0;
	}
	this.fire = function () {
		this.bulletQ.enq({"Fire" : 1});
	}
	this.forward = function (steps) {
		if (steps == 0) {
			return;
		}
		if (steps < 0) {
			this.moveQ.enq({
				"cmd" : "backward",
				"steps" : -steps
			});
		} else {
			this.moveQ.enq({
				"cmd" : "forward",
				"steps" : steps
			});
		}
	}
	this.backward = function (steps) {
		if (steps == 0) {
			return;
		}
		if (steps < 0) {
			this.moveQ.enq({
				"cmd" : "forward",
				"steps" : -steps
			});
		} else {
			this.moveQ.enq({
				"cmd" : "backward",
				"steps" : steps
			});
		}
	}
	this.rotateCannon = function (rotDeg) {
		if (rotDeg == 0) {
			return;
		}
		this.rotateCannonQ.enq({
			"rotDeg" : rotDeg
		});
	}
	this.rotateTank = function (rotDeg) {
		if (rotDeg == 0) {
			return
		}
		this.rotateQ.enq({
			"rotDeg" : rotDeg
		});
	}
}
var queue = function () {
	this.front = -1;
	this.rear = -1;
	this.q = [];
	this.count = 0;
	this.enq = function (cmd) {
		if (this.front == -1) {
			this.front = this.rear = 0;
		} else {
			this.rear = this.rear + 1;
		}
		this.q[this.rear] = cmd;
		this.count = this.count + 1;
	};
	this.deq = function (cmd) {
		if (this.count == 0)
			return;
		this.front = this.front + 1;
		this.count = this.count - 1;
		if (this.count == 0)
			this.front = this.rear = -1;
	};
	this.get = function () {
		if (this.count == 0)
			return 0;
		return this.q[this.front];

	};
	this.set = function (cmd) {
		if (this.count == 0)
			return 0;
		this.q[this.front] = cmd;
		return 1;

	};
	this.clear = function () {
		this.count = 0;
		this.front = this.rear = -1;
		q = [];
	};
};
var checkCollisionPoly = function (a, b) {
	//console.log("coll check" );
	//console.log(a,b);
	var polygons = [a, b];
	var minA,
	maxA,
	projected,
	i,
	i1,
	j,
	minB,
	maxB;

	for (i = 0; i < polygons.length; i++) {

		// for each polygon, look at each edge of the polygon, and determine if it separates
		// the two shapes
		var polygon = polygons[i];
		for (i1 = 0; i1 < polygon.length; i1++) {

			// grab 2 vertices to create an edge
			var i2 = (i1 + 1) % polygon.length;
			var p1 = polygon[i1];
			var p2 = polygon[i2];

			// find the line perpendicular to this edge
			var normal = {
				x : p2.y - p1.y,
				y : p1.x - p2.x
			};

			minA = maxA = undefined;
			// for each vertex in the first shape, project it onto the line perpendicular to the edge
			// and keep track of the min and max of these values
			for (j = 0; j < a.length; j++) {
				projected = normal.x * a[j].x + normal.y * a[j].y;
				if (isUndefined(minA) || projected < minA) {
					minA = projected;
				}
				if (isUndefined(maxA) || projected > maxA) {
					maxA = projected;
				}
			}

			// for each vertex in the second shape, project it onto the line perpendicular to the edge
			// and keep track of the min and max of these values
			minB = maxB = undefined;
			for (j = 0; j < b.length; j++) {
				projected = normal.x * b[j].x + normal.y * b[j].y;
				if (isUndefined(minB) || projected < minB) {
					minB = projected;
				}
				if (isUndefined(maxB) || projected > maxB) {
					maxB = projected;
				}
			}

			// if there is no overlap between the projects, the edge we are looking at separates the two
			// polygons, and we know there is no overlap
			if (maxA < minB || maxB < minA) {
				//console.log("polygons don't intersect!");
				return false;
			}
		}
	}
	return true;

}
var isUndefined = function (obj) {
	return (typeof obj === "undefined");
}
var loadScript = function (url, callback) {
	// Adding the script tag to the head as suggested before
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	// Then bind the event to the callback function.
	// There are several events for cross browser compatibility.
	script.onreadystatechange = callback;
	script.onload = callback;
	// Fire the loading
	head.appendChild(script);
}
var arena = function () {
	this.width = 500;
	this.height = 300;
	this.wallSize = 50;
	this.walls = [
		[{
				x : -this.wallSize,
				y : -this.wallSize
			}, {
				x : -this.wallSize,
				y : this.height
			}, {
				x : 0,
				y : this.height
			}, {
				x : 0,
				y : -this.wallSize
			}
		],
		[{
				x : -this.wallSize,
				y : this.height + this.wallSize
			}, {
				x : this.width,
				y : this.height + this.wallSize
			}, {
				x : this.width,
				y : this.height
			}, {
				x : -this.wallSize,
				y : this.height
			}
		],
		[{
				x : this.width,
				y : this.height + this.wallSize
			}, {
				x : this.width + this.wallSize,
				y : this.height + this.wallSize
			}, {
				x : 0,
				y : this.width + this.wallSize
			}, {
				x : 0,
				y : this.width
			}
		],
		[{
				x : 0,
				y : 0
			}, {
				x : this.width + this.wallSize,
				y : 0
			}, {
				x : this.width + this.wallSize,
				y : -this.wallSize
			}, {
				x : 0,
				y : -this.wallSize
			}
		]
	];
	this.init = function () {}

}
var p1exists,p2exists;
var gettingScripts0 = function () {
	pl = 0;
	g.loadedScripts++;
	
	p1exists = 1;
	if(isUndefined(eval(g.players[pl]))){
		p1exists = 0;
	}else{
		g.robots[pl].funcs = new(eval(g.players[pl]))();
	}
	
	if (g.loadedScripts == 2) {
		if(p1exists == 0 || p2exists == 0){
			
			sendObj = {
				"fightid":fight_id,
				"winner":-10,
				"savedata":"REJECTED"
			};
			$.post("savegame.php",sendObj,function(data){window.close(window.close());});
		}
		else{
			g.init();
		}
	}
}
var gettingScripts1 = function () {
	pl = 1;
	g.loadedScripts++;
	
	p2exists = 1;
	if(isUndefined(eval(g.players[pl]))){
		p2exists = 0;
	}else{
		g.robots[pl].funcs = new(eval(g.players[pl]))();
	}
	
	if (g.loadedScripts == 2) {
		
		if(p1exists == 0 || p2exists == 0){
			
			sendObj = {
				"fightid":fight_id,
				"winner":-10,
				"savedata":"REJECTED"
			};
			$.post("savegame.php",sendObj,function(data){});
		}
		else{
			g.init();
		}
	}
}
var g = new game();
g.robots[0] = new robot();
g.robots[1] = new robot();
loadScript("getjs.php?tankname=" + players[0] + "&player_id=" + player_ids[0], gettingScripts0);
loadScript("getjs.php?tankname=" + players[1] + "&player_id=" + player_ids[1], gettingScripts1);
