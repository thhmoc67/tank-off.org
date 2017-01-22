<?php

	
	error_reporting(E_ALL);
	include("connect.php");
	
	$players = array(21,15,29,30,7,17,26,37,35,39,25);


	$p = 11;
	
	for($i=0;$i<($p-1);$i++){
		for($j=($i + 1);$j<$p;$j++){

			add_ft($players[$i],$players[$j],$con);
		}
	}
	
	function add_ft($a,$b,$c){
		add_tourney(add_fight($a,$b,$c),$a,$b,$c);
	}
	
	function add_tourney($f,$a,$b,$c){
		
		$query = "INSERT INTO `tournament` VALUES ({$f},{$a},{$b},0,1)";
		mysqli_query($c,$query);
	}
	
	
	function add_fight($a,$b,$c){
		$query = "INSERT INTO `fights`( `player1_id`, `player2_id`, `result`, `winner`) VALUES ({$a},{$b},0,0)";
		mysqli_query($c,$query);
		$id = mysqli_insert_id($c);
		return $id;
		
	}
?>