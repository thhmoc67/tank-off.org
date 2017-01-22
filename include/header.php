		<?php
		if(isset($_SESSION["userid"]))
		{
		?>
		<div style="position:fixed;right:20px;top:20px;"><a style="color:white;" href="logout.php">Log Out!</a></div>
		<?php ?>
		<?php
		$uid = $_SESSION["userid"];
		$query = "select * from messages where user_id = {$uid} AND status = 0";
		$res = mysqli_query($con,$query);
		if(mysqli_num_rows($res) > 0)
		{
			$row = mysqli_fetch_array($res);
			
		?>
		<div id="errormsg" style="position:fixed;left:35%;top:20px;height:50px;text-align:center;"><div style="padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px;border:solid 2px white;background-color:rgba(200,25,25,0.5);font-family:helvetica;color:white;font-size:18px;z-index:0;text-align:center;">There was an error with your code:<br><span style="font-family:monospace;text-align:center;"><?php echo $row["message"]; ?></span></div></div>
		<script>
		setTimeout(function(){
			var x = document.getElementById("errormsg");
			x.outerHTML = "";
		},6000);
		</script>
		<?php
		$query = "update messages set status = 1 where msg_id=".$row["msg_id"];
		mysqli_query($con,$query);
		}}
		?>
		<style>
			*{
				z-index:100;
			}
		</style>
		<div id="header">
			<div>
				<div>
					<a href="index.php" class="logo"><img src="images/logo.png" alt=""></a>
					<ul>
						<li >
							<a href="index.php" id="menu1">API</a>
						</li>
						<li>
							<a href="record.php" id="menu2">Record!</a>
						</li>
						<li >
							<a href="edit.php" id="menu3">Edit</a>
						</li>
						<li>
							<a href="players.php" id="menu4">Fight!</a>
						</li>
						<li>
							<a href="rules.php" id="menu5">Rules</a>
						</li>
					</ul>
				</div>
			</div>
		</div>