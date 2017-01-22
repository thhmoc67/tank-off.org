<?php
session_start();
include("connect.php");
if(isset($_SESSION['usersucess'])==""){
	header("location:login.php?msg=firstlogin");
}
?>
<!DOCTYPE HTML>

<html>
<head>
	<meta charset="UTF-8">
	<title>Tank-Off</title>
	<script src="jquery-2.2.1.min.js" type="text/javascript"></script>
	<link rel="stylesheet" href="css/style.css" type="text/css">
	<script src="/ace-builds/src/ace.js" type="text/javascript"  charset="utf-8"></script>
	<script>
		var tName = "<?php echo $_SESSION["tankname"]; ?>";
		var defaultText = `var ` + tName +` = function(){\n	this.collision = function(robot){\n		//Commands for collision\n	};\n	this.inView = function(robot){\n\n		//Commands when the other robot is in View\n	};\n	this.bulletHit = function(robot){\n		//Commands when you are hit by enemy's bullet\n	};\n	this.wallHit = function(robot){\n		//Commands when you hit the wall\n	};\n	this.idle = function(robot){\n		//Commands when your tank has nothing to do\n	};\n}`;
		
		<?php
			$userid =$_SESSION['userid'];
			$query = "select * from codes where user_id = " . $userid;
			$res = mysqli_query($con,$query);
			$num = mysqli_num_rows($res);
			if($num > 0){
				$row = mysqli_fetch_array($res);
				$code = $row[2];
				$code = str_replace(array("\n","\r\n"),"\\n",$code);
				$code = str_replace(array("\""),"\\\"",$code);
				$code = str_replace(array("\'"),"\\\'",$code);
				echo "defaultText = \"" . $code . "\"";
			}
		?>
		
		var sampleText = `var ` + tName +` = function(){\n	this.collision = function(robot){\n		robot.rotateCannon(360);\n	}\n	this.inView = function(robot){\n		robot.fire();\n		robot.fire();\n		robot.fire();\n	}\n	this.bulletHit = function(robot){\n		robot.forward(200);\n		robot.backward(200);\n	}\n	this.wallHit = function(robot){\n		robot.rotateTank(180);\n		robot.forward(100);\n	}\n	this.idle = function(robot){\n		robot.rotateTank(360);\n		robot.forward(200);\n	}\n}`;
		
		var saveCode = function(e){
			if(e.innerHTML=="Saving..."){
				return;
			}
			var c = confirm("Save the Code?");
			if(c){
				e.innerHTML="Saving...";
				var codeText = editor.getValue();	
				if(codeText.length > 10240){
					alert("Your code cannot be greater than 10KB");
					return;
				}
				$.ajax({"url":"savecode.php","data":{"code":codeText},"type":"post","error":function(){alert("Could not save code");e.innerHTML = "Save Code";},"success":function(data){console.log(data);e.innerHTML = "Save Code";}});
			}
		}
	</script>
</head>
<body>
	<div id="background">
		<?php include("include/header.php"); ?>
		<div id="body">
			<div class="classdiv">
				
				<div>
					<div class="games" style="width:920px;">
					
						<div style="text-align:center;"><span style="font:20px/normal 'Monaco','Menlo';">//Do NOT change the class name or delete any functions. It might break your tank.</span></div>
						<div id="editor" style="height:600px;margin:20px;"></div>
						
						<style>
							.button{
								padding:10px;
								padding-right:10px;
								border-radius:10px;
								height:50px;
								border:solid 1px white;
								margin-left:100px;
								display:inline-block;
								color:#222222;
								display: table-cell;
								vertical-align: middle;
								cursor: pointer;
							}
						</style>
						<div style="width:200px;display:table-cell;"></div>
						<div style="background-color:#0095ff" class="button" onClick="editor.setValue(defaultText);">Default Code</div>
						<div style="width:100px;display:table-cell;"></div>
						<div style="background-color:#0095ff" class="button"  onClick="editor.setValue(sampleText);">Sample Code</div>
						<div style="width:100px;display:table-cell;"></div>
						<div style="background-color:#0095ff" class="button" onClick="saveCode(this);">Save Code</div>
						<div style="height:50px;"></div>
						
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
	editor.setValue(defaultText);
</script>
</body>
</html>