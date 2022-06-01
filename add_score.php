<?php

$playerName = $_POST['playerName'];
$score = $_POST["score"];

$servername = "localhost";
$username = "objeto81_admin";
$password = "Mkhnh9mg9Y4JXrs";
$dbname = "objeto81_leaderboard";

// Create connection
$conn = new mysqli($servername,$username,$password,$dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: ".$conn->connect_error);
}

// $sql = "INSERT INTO leaderboard_table (username_column, highscore_column) VALUES ('aNub', 0)";
$sql = "INSERT INTO scores (name, score) VALUES ('" . $playerName . "', " . $score . ")";

if ($conn->query($sql)===TRUE) {
    // echo "New record created successfully";
    echo "your moms score added to leaderboard, thx noob";
} else {
    // echo "Error: ".$sql."<br>".$conn_error;
    echo "ERROR: PC LOAD LETTER";
}

$conn->close();

?>