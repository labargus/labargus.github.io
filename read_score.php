<?php
$servername = "localhost";
$username = "objeto81_admin";
$password = "Mkhnh9mg9Y4JXrs";
$dbname = "objeto81_leaderboard";

$con = new mysqli($servername,$username,$password,$dbname);

$sql = "SELECT * FROM scores ORDER BY score DESC LIMIT 100";	
$result = mysqli_query($con, $sql);

while($rec = mysqli_fetch_array($result)){
	$rows[] = $rec;
}
$json_row=json_encode(array('data' => $rows));
echo $json_row;

mysqli_close($con);
?>