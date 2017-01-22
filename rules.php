<?php
	session_start();
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
				<div style="margin:0 auto;width:800px;"><br>
					<h4 style="font-size:24px;color:white;text-decoration:underline;">Rules: </h4>
				</div>
					
			<div style="margin:0 auto;width:800px;"><br>
				<style>
					li{
						padding-bottom:10px;
					}
				</style>
				<ul style="font-size:16px;color:#eeeeee">
					<li>One person, One Account.(However, not one account, one person)</li>
					<li>You can collaborate with others on your tank however, one may collaborate only on one tank.</li>
					<li>You will not attempt to break the tank by renaming default functions and tank name.</li>
					<li>Any attempt at unethical behaviour,such as attempts at XSS attacks and such will result in immediate disqualification.</li>
					<li>The codes will be locked at 11:59 P.M., 28/02/2016. All submissions will enter a tournament and one shall emerge victorious.</li>
					<li>The battles you fight before the tournament are only for practice. Your win record may factor in only in case of a draw.</li>
					<li>You will have fun(Yes, this is a rule)</li>
				</ul>
				
			</div>
		
				</div>
			</div>
		</div>
		<?php include("include/footer.php"); ?>
	</div>
	
</body>
</html>