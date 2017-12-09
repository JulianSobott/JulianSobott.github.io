<?php
require 'databaseConnection.php';

if (isset($_POST)) {
  $json = $_POST['data'];
  $data = json_decode($json, true);
  var_dump($data[0]);
}


 ?>
