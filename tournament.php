<?php
	session_start();
	
	include("connect.php");
	if(isset($_SESSION['usersucess'])==""){
		header("location:login.php?msg=firstlogin");
	}
?><!DOCTYPE HTML>
<html>
<head>
	<meta charset="UTF-8">
	<title>Tank-Off</title>
	<link rel="stylesheet" href="css/style1.css" type="text/css">


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
					<h4 style="font-size:24px;color:white;text-decoration:underline;">The Tournament: </h4>

					<table>
					<tr><th>tank_name</th><th>Wins</th><th>Losses</th><th>Draw</th></tr>
					<tr><td>Democ</td><td>5</td><td>4</td><td>1</td></tr><tr><td>Enigma</td><td>9</td><td>1</td><td>0</td><td>1<sup>st</sup> Place</td></tr><tr><td>jarvis</td><td>0</td><td>10</td><td>0</td></tr><tr><td>hpp</td><td>4</td><td>5</td><td>1</td></tr><tr><td>psgehlot</td><td>5</td><td>5</td><td>0</td></tr><tr><td>mgf1</td><td>1</td><td>9</td><td>0</td></tr><tr><td>XeqtR</td><td>4</td><td>5</td><td>1</td></tr><tr><td>barbie_tank</td><td>7</td><td>3</td><td>0</td></tr><tr><td>XENRYUS</td><td>7</td><td>3</td><td>0</td><td>2<sup>nd</sup> Place</td></tr><tr><td>TIGER</td><td>7</td><td>3</td><td>0</td><td>2<sup>nd</sup> Place</td></tr><tr><td>drn_72</td><td>4</td><td>5</td><td>1</td></tr>					</table>
				</div>
				
			<div style="margin:0 auto;width:800px;"><br>
				<h4 style="font-size:24px;color:white;text-decoration:underline;">Something was not clear: </h4>
				<h4 style="font-size:16px;color:#dddddd;">Still have questions?Queries?Feedback? Bugs to report? Send them directly over whatsapp +91-8866530306 or feel free to call +91-7404190923. We do not bite. </h4><br><br>
				
			</div>
		
				</div>
			</div>
		</div>
		<?php include("include/footer.php"); ?>
	</div>
	
</body>
</html>