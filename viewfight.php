<?php
	session_start();
	if(isset($_SESSION['usersucess'])==""){
		header("location:login.php?msg=firstlogin");
	}
	
	if(!isset($_REQUEST["fight_id"])){
		header("location:index.php");
		
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
					<div  style="margin:0 auto;width:500px;">
						<iframe scrolling="no" style="overflow:hidden;" width="500" height="300" src="admin/showgame.php?fight_id=<?php echo $_REQUEST["fight_id"] ?>" />
					</div>
				</div>
			</div>
		</div>
		<?php include("include/footer.php"); ?>
	</div>
</body>
</html>