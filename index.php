<?php
	session_start();
	include("connect.php");
        header("location:tournament.php");
if(isset($_SESSION['usersucess'])==""){
		header("location:login.php?msg=firstlogin");
	}

?><!DOCTYPE HTML>
<html>
<head>
	<meta charset="UTF-8">
	<title>Tank-Off</title>
	<link rel="stylesheet" href="css/style1.css" type="text/css">
	<script src="/ace-builds/src/ace.js" type="text/javascript"  charset="utf-8"></script>
</head>
<body>
	<div id="background">
		<?php include("include/header.php"); ?>
		<div id="body">
			<div>
				<div>
				<style>
					.info  p{
						font-size:18px;
						color:#dddddd;
						font-family:monospace;
					}
				</style>
				<div class="info" style="margin:0 auto;width:800px;"><br>
					<h4 style="font-size:24px;color:white;text-decoration:underline;">The story: </h4>
					<p>
						You are a commander of a tank on a battlefield. Now you, being lazy, do not actually want to sit in the tank and the gods respond to your prayers!!!
					</p><br>
					<p>
						They give you a javascript interface for your tank and now you can use that to determine how the tank will behave on the field. You have to prepare you tank when it eventually fights. You can <a href="edit.php">edit</a> its code to make it the greatest tank that ever fought!. Now get cracking!
					</p>
				</div>
				<div class="info" style="margin:0 auto;width:800px;"><br>
					<h4 style="font-size:24px;color:white;text-decoration:underline;">Objective: </h4>
					<p>
						You have the events. You have the functions. Now you have to best others in a furious battle of wits and bullets. 
					</p><br>
					<p>
						The tank responds to several events and can be commanded by a few functions, which are documented below. Use them and your brain to ensure that you end up winning this Tank-Off!
					</p>
				</div>
				<div style="margin:0 auto;width:800px;"><br>
					<h4 style="font-size:24px;color:white;text-decoration:underline;">Functions available: </h4>
				</div>
					<div style="height:600px;width:800px;margin:0 auto;" id="editorFunc">//Your robot object has following data member and functions
var robot = function(){
    
    //Data members about your robot
    
    // Position from X-Axis where Origin is bottom left
    this.x;
    
     // Position from Y-Axis where Origin is bottom left
    this.y;
    
    //Absolute Angle of cannon relative to Positive X-Axis
    this.cannonAngle;
    
    //Absolute Angle of Tank relative to Positive X-Axis
    this.tankAngle;
    
    //Shows your health
    this.health;
    
    
    //Functions for movement. Negative value can be given for opposite 
    //direction. Hence, robot.forward(-50) is same as robot.backward(50)
    this.forward();
    this.backward();
    
    //Function to Rotate Tank. It will also rotate cannon with it.
    //You can use negative value to specify 
    //Direction. Positive is Counter-Clockwise
    this.rotateTank();
    
    //Function to Rotate Cannon. You can use negative value to specify 
    //Direction. Positive is Counter-Clockwise
    this.rotateCannon();
    
    //Fire a bullet!
    //has a small reload time.
    this.fire();
    
    //Info about the enemy. ONLY AVAILABLE IN collision and inView events
    //Use this wisely!!!
    this.enemy = {
        // Position from X-Axis where Origin is bottom left
        x,
        
         // Position from Y-Axis where Origin is bottom left
        y,
        
        //Absolute Angle of cannon relative to Positive X-Axis
        cannonAngle,
        
        //Absolute Angle of Tank relative to Positive X-Axis
        tankAngle,
        
        //Shows enemy's health
        health
    };
};</div>
				<div style="margin:0 auto;width:800px;"><br>
					<h4 style="font-size:24px;color:white;text-decoration:underline;">How to use events and API: </h4>
				</div>
					<div style="height:800px;width:800px;margin:0 auto;" id="editor">var tank_name = function(){
    
    //Create a class of your tank
    
    	this.idle = function(robot){
	    //When your robot has nothing to do and
	    //nothing interesting is going on.
	    //You can use this to search for the enemy
    	robot.forward(150);
        robot.rotateCannon(360);
        robot.backward(100);
        robot.rotateCannon(360);
        robot.rotateTank(20);
	};
	this.inView = function(robot){
	    //The event that will occur when
	    //the enemy is in your field of view.
	    robot.fire();
	    robot.fire();
	    robot.fire();//You saw the enemy. Might as well fire at him.
	    
	};
	this.bulletHit = function(robot){
	    //Ouch...taking fire
	    //The event that will be executed
	    //when an enemy's bullet hits you.
	    robot.rotateCannon(360);
	    robot.forward(200);
	};
	this.wallHit = function(robot){
	    //When you are a dummy and you run into a wall.
	};
	this.collision = function(robot){
	    //The event that will be executedwhen you collide with the enemy
	    var eX = robot.enemy.x;
	    var eY = robot.enemy.y;
	    var x = robot.x;
	    var y = robot.y;
	    //Use tan inverse to find out which direction
		//you need to be facing to spot the enemy.
	    var thetaRad = Math.atan((eY-y)/(eX-x));
	    var theta = thetaRad*180/Math.PI;//Convert to degrees.
	    
	    robot.rotateCannon(robot.cannonAngle - theta);
	};
};</div>
				
		<div style="margin:0 auto;width:800px;"><br>
			<h4 style="font-size:24px;color:white;text-decoration:underline;">The instructions were not clear: </h4>
			<h4 style="font-size:16px;color:#dddddd;">Still have questions?Queries?Feedback? Bugs to report? Send them directly over whatsapp +91-8866530306 or feel free to call +91-7404190923. We do not bite. </h4><br><br>
			
		</div>
		
				</div>
			</div>
		</div>
		<?php include("include/footer.php"); ?>
	</div>
	
	<script>
		var editor = ace.edit("editor");
		editor.setTheme("ace/theme/monokai");
		editor.getSession().setMode("ace/mode/javascript");
		editor.setFontSize(18);	
		editor.setReadOnly(true);
		var editorf = ace.edit("editorFunc");
		editorf.setTheme("ace/theme/monokai");
		editorf.getSession().setMode("ace/mode/javascript");
		editorf.setFontSize(18);	
		editorf.setReadOnly(true);
	</script>
</body>
</html>