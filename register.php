<?php
	include("connect.php");
	$name=$_POST['name'];
	$tankname=$_POST['tankname'];
	$instiname=$_POST['instiname'];
	$course=$_POST['course'];
	$rollno=$_POST['rollno'];
	$monum=$_POST['monum'];
	$email=$_POST['email'];
	$password=$_POST['password'];
	
	$result=mysqli_query($con,"select * from userdtls where tank_name='$tankname' or email='$email'") or die(mysqli_error());
	$ct=mysqli_num_rows($result);
	if($ct>0){
		header("location:login.php?msg=regerror");
	}
	else
	{
		$data=mysqli_query($con,"insert into userdtls(`name`, `tank_name`, `insti_name`, `course`, `roll_no`, `mo_no`, `email`, `pwd`) values ('$name','$tankname','$instiname','$course','$rollno','$monum','$email','$password')") or die(mysqli_error());
		header("location:login.php?msg=suc");
	}
mysqli_close($con);
?>