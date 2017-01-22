<?php
session_start();
if(isset($_SESSION['usersucess'])==""){
	header("location:login.php?msg=firstlogin");
}
include("connect.php");
$uis = $_SESSION["userid"];
$query = "select * from codes where user_id = {$uis}";

$res = mysqli_query($con,$query);

if(mysqli_num_rows($res) == 0){
	header("location:edit.php?msg=submitCodeFirst");
}

?>
<!DOCTYPE HTML>
<html>
<head>
	<meta charset="UTF-8">
<title>Players </title>
	<link rel="stylesheet" href="css/style.css" type="text/css">
</head>
<body>
	<div id="background">
		<?php include("include/header.php"); ?>
		<div id="body">
			<div>
				<div>
					<div class="about">
					
					
					<?php
						
						$query = "select * from userdtls where user_id IN(select user_id from codes where NOT user_id = ".$_SESSION["userid"].")";
						$res = mysqli_query($con,$query);
						$rows = array();
						$i = 0;
						while($row = mysqli_fetch_array($res)){
							$rows[$i] = $row;
							$i++;
						}
						
					?>
						<div class="content">
							<ul>
								
								<?php
									
									foreach($rows as $row){
											echo "<li><h3>";
												echo $row["tank_name"];
											echo "</h3></li>";
									}
								?>
							</ul>
						</div>
						<div class="aside">
						<style>
							h3 > a{
								color:white;
							}
							h3 > a:hover{
								color:blue!important;
								transition:all 0.25s;
							}
							h3 > a:visited{
								color:white;
							}
						</style>
							<ul>
								<?php
									foreach($rows as $row){
											echo "<li><h3><a href='fight.php?enemy=";
												echo $row["user_id"];
											echo "' style=''>FIGHT!</a></h3></li>";
									}
								?>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<?php include("include/footer.php"); ?>
	</div>
</body>
</html>