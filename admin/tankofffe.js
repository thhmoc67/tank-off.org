var looper;
var obj ;
var loopTimer;
var tankDim = {"xlen":40,"ylen":40}
var cannonDim = {"xlen":25,"ylen":10}
var bulletDim = {"xlen":10,"ylen":6};
var arenaDim = {"xlen": 500,"ylen":300};
var bullets = [{},{}];
var bulletsDiv;
var finishGame =function(){
	
	if(obj.winner == 0){
		alert("Player 1 wins");
	}
	else if(obj.winner == 1){
		alert("Player 2 wins!");
	}
	else{
		alert("Draw!");
	}
	
	
	
	
}

var showGame = function(data){
	var frameTime = 100;
	obj = JSON.parse(data);
	delete data;
	looper = 0;
	bulletsDiv = document.getElementById("bullets");
	loopTimer = setInterval(renderFrame,frameTime);
}

var renderFrame = function(){
	if(looper >= obj.loopCount){
		clearInterval(loopTimer);
		finishGame();
		return;
	}
	renderTank(obj[looper].gs.tanks[0],"tank1");
	renderTank(obj[looper].gs.tanks[1],"tank2");
	
	var i =0;
	for(i=0;i<2;i++){
		var bArray = Object.keys(bullets[i]);
		var x;
		for(x = 0;x<bArray.length;x++){
			
			if(isUndefined(obj[looper].gs.bullets[i][bArray[x]])){
				
				delete bullets[i][bArray[x]];
				var temp = document.getElementById("bullet_" + i + "_" + bArray[x]);
				if( temp != null){
					temp.outerHTML = "";
				}
			}
		}
		bArray = Object.keys(obj[looper].gs.bullets[i]);
		for(x = 0;x<bArray.length;x++){
				var temp = document.getElementById("bullet_" + i + "_" + bArray[x]);
				if( temp === null){
					var newB = newBullet(i,bArray[x]);
					renderBullet(newB,obj[looper].gs.bullets[i][bArray[x]]);
					bulletsDiv.appendChild(newB);
					bullets[i][bArray[x]] = newB;
				}
				else{
					renderBullet(temp,obj[looper].gs.bullets[i][bArray[x]]);
				}
		}
		
		renderHealth(obj[looper].gs.tanks[i].h,i);
	}
	
	looper++;
}

var renderHealth = function(health,player){
	if(health <0){
		health = 0;
	}
	$("#player_" + player + "_health").css("width", health+"px");
}

var renderTank = function(tankObj,tankEle){
	var x = tankObj.x;
	var y = arenaDim.ylen - tankObj.y;
	var tA = 360 - tankObj.tA;
	var cA = 360 - tankObj.cA;
	x = x - (tankDim.xlen)/2;
	y = y - (tankDim.ylen)/2;
	
	$($("#" + tankEle + " > .tankbody")[0]).css("left",x);
	$($("#" + tankEle + " > .tankbody")[0]).css("top",y);
	$($("#" + tankEle + " > .tankbody")[0]).css("transform","rotate(" + tA + "deg)");
	
	
	var x = tankObj.x;
	var y = arenaDim.ylen - tankObj.y;
	y = y - (cannonDim.ylen)/2;
	
	
	$($("#" + tankEle + " > .tankcannon")[0]).css("left",x);
	$($("#" + tankEle + " > .tankcannon")[0]).css("top",y);
	$($("#" + tankEle + " > .tankcannon")[0]).css("transform","rotate(" + cA + "deg)");
}

var newBullet = function(pId,bId){
	
	var b = document.createElement("div");
	b.className = "bullet";
	b.id = "bullet_" + pId + "_" + bId ;
	return b;
}

var renderBullet = function(b,renBull){
	
	var x = renBull.x;
	var y = arenaDim.ylen - renBull.y;
	var a = 360 - renBull.a;
	x = x - (bulletDim.xlen)/2;
	y = y - (bulletDim.ylen)/2;
	
	$(b).css("left",x);
	$(b).css("top",y);
	$(b).css("transform","rotate(" + a + "deg)");
	
	
}

var getGameRecord = function(){
	
	$.ajax({
	  url: "getgamedata.php?fight_id="+this_fight_id,
	  data:{},
	  sync:false
	}).done(function(data) {
		showGame(data);
	});
}


var createBullet = function(){
	var b = document.createElement("div");
	
}

var isUndefined = function (obj) {
	return (typeof obj === "undefined");
}
getGameRecord();