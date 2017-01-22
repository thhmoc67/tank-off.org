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
	<title>League Tank-Off</title>
	<link rel="stylesheet" href="css/style.css" type="text/css">
</head>
<body>
	<div id="background">
		<?php include("include/header.php"); ?>
		<div id="body">
			<div class="games">
				<div class="content" style="width:900px;">
				<h3>History!</h3>
				<style>
					.recordlinks  a{
						color: #dddddd;
						transition: all 0.2s;
					}
					.recordlinks a:hover{
						color:#0044ff!important;
						transition: all 0.2s;						
					}
					.recordlinks a:visited{
						color:#dddddd;
					}
				</style>
					<ul style="font-size:20px;" class="recordlinks">
						<?php
							$userid = $_SESSION["userid"];
							$query="select * from fights,userdtls where (fights.player1_id=userdtls.user_id OR fights.player2_id=userdtls.user_id) AND userdtls.user_id=" . $userid ;
							$res = mysqli_query($con,$query);
							
							while($row = mysqli_fetch_array($res)){
								//TODO: properly render things
								
								if($row["player1_id"] ==$userid){
									$p = 1;
									$enemy = 2;
								}
								else{
									$p = 2;
									$enemy = 1;
								}
								
								
								
								if($row["result"] == 0){
									$str = "Pending";
									$link = "";
								}
								else{
									
									$link = "<div style='display:inline-block;'><a href='viewfight.php?fight_id={$row["fight_id"]}'>View!</a></div>";
									if($row["winner"] + 1 == $p){
										$str = "Win";
									}
									elseif($row["winner"] == 2 || $row["winner"] == -1){
										$str = "Draw";
									}
									elseif($row["winner"] == -10){
										$str = "REJECTED!";
										$link = "";
									}
									elseif($row["winner"] == -9){
										$str = "ERROR!!";
										$link = "";
									}
									else{
										$str = "Lose";
									}
								}
								
								
								$q = "select * from userdtls where user_id=".$row["player".$enemy."_id"];
							
								$qres = mysqli_query($con,$q);
								$qres = mysqli_fetch_array($qres);
								
								
								
								echo "<li><div style='display:inline-block;width:30%;'>Enemy:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$qres["tank_name"]."</div><div style='display:inline-block;width:30%;'>Result:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{$str}</div>{$link}</li>";
							}
						?>
					</ul>
				</div>
			</div>
		</div>
		<?php include("include/footer.php"); ?>
	</div>
</body>
</html>