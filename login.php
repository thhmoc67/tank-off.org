<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Login-TankOfff</title>
		<link rel="stylesheet" href="css/style2.css" type="text/css">
		<link rel="stylesheet" type="text/css" href="css/demo.css" />
		<link rel="stylesheet" type="text/css" href="css/style54.css" />
		<link rel="stylesheet" type="text/css" href="css/animate-custom.css" />
		<style>
			input{
				color:white;
			}
		</style>
	</head>
	<body">
	<div id="background">
		<?php include("include/header.php"); ?>
		<div id="body">
			<div class="classdiv">
				<div>
					<div class="games">
						<div class="content">
							<h3>Login</h3>
							<ul>
								<div class="form-style-8">
									<form class="theform" method="post" action="login_check.php">
										<h2>Login to your account</h2>
										<input type="text" name="username" id="username" required="true" placeholder="Your Tank-Name Or Email" />
										<input type="Password" name="password" id="password" required="true" placeholder="Password" />
										<?php
											if(isset($_REQUEST['msg'])!=""){
											if($_REQUEST['msg']=="loginerror"){
												?>
										<div class="alert alert-info alert-danger">
											User-Name Or Password Wrong.
										</div>
										<?php
											}
											if($_REQUEST['msg']=="suc"){
											?>
										<div class="alert alert-info alert-danger">
											You Are Sucessfully Register.
										</div>
										<?php
											}
											if($_REQUEST['msg']=="logout"){
											?>
										<div class="alert alert-info alert-danger">
											You Are Sucessfully Logout.
										</div>
										<?php
											}
											if($_REQUEST['msg']=="firstlogin"){
											?>
										<div class="alert alert-info alert-danger">
											Login First.
										</div>
										<?php
											}
											} 
											?>
										<input type="Submit" value="Login" />
									</form>
								</div>
							</ul>
						</div>
						<div class="content">
							<h3>Sign-up</h3>
							<ul>
								<div class="form-style-8">
									<h2>Create your account</h2>
									<form class="theform" method="post" action="register.php">
										<input type="text" name="name" required="true" placeholder="Your Name:" />
										<input type="text" name="tankname" required="true" placeholder="Tank Name:" />
										<input type="text" name="instiname" required="true" placeholder="Institude Name:" />
										<input type="text" name="course" required="true" placeholder="course Name:" />
										<input type="text" name="rollno" required="true" placeholder="Roll No:" />
										<input type="text" name="monum" required="true" placeholder="Mobile No:" />
										<input type="email" name="email" required="true" placeholder="Email:" />
										<input type="password" name="password" required="true" placeholder="Password:" />
										<br/>
										<?php
											if(isset($_REQUEST['msg'])!=""){
											if($_REQUEST['msg']=="regerror"){
										?>
										<div class="alert alert-info alert-danger">
											User-Name Or Email Already Exists.
										</div>
										<?php
											}
											}
											?>
										<input type="submit" value="Sign-Up" />
									</form>
								</div>
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