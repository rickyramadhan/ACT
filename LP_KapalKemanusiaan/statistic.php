<?php
// $koneksi_db = $koneksi;

function get_statistic() {
	include ('koneksi.php');
	$query = "SELECT * from config where ckey like '%home_beras%'";

	$result = mysqli_query($link, $query);
	$statistic = array();
	
	// while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
	// 	$statistic[$row['ckey']] = $row['cval'];
	// }

	foreach ($result as $row) {
		$statistic[$row['ckey']] = $row['cval'];
	}

	return $statistic;
}

?>