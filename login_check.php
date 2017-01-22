<?php
		session_start();
		include("connect.php");
		$userid=$_POST['username'];
		$password=$_POST['password'];
		$result=mysqli_query($con,"select * from userdtls where tank_name='{$userid}' and pwd='{$password}' or Email='{$userid}' and pwd= '{$password}' ") or die(mysql_error());
		$ct=mysqli_num_rows($result);
		if($ct>0){
			$row = mysqli_fetch_array($result);
			$_SESSION['usersucess']=$userid;
			$_SESSION['tankname']=$row[2];
			$_SESSION['userid'] = $row[0];
			header("location:index.php?msg=sucess");
		}
		else
		{
		header("location:login.php?msg=loginerror");				
		}
mysqli_close($con);
?>