<?php
session_start();
/*
	if(isset($_SESSION['usersucess'])==""){
		http_response_code(404);
		return;
	}
	include("connect.php");
	$userid =$_SESSION['userid'];
	$code = mysqli_real_escape_string( $con,$_REQUEST["code"]);
	$query = "select * from codes where user_id = " . $userid;
	echo $query;
	$res = mysqli_query($con,$query);
	$num = mysqli_num_rows($res);
	
	if($num == 0){
		$query = "insert into codes(`user_id`,`user_code`) values(" . $userid. ", \"". $code ."\")";
	}
	else{
		$query = "update codes set user_code = \" ". $code ." \" where user_id = " . $userid;
	}
	
	mysqli_query($con,$query);
*/
?>