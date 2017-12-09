<?php
//print_r($_POST);

/*--------------Read in vocabulary-----------------*/
$dir = "../json/*.txt";
foreach (glob($dir) as $file) {
  echo $file;
  echo "<br>";

  $vocFile = fopen("$file", "r") or die("Unable to open file");
  //echo fread($vocFile , filesize("../json/TestVoc.txt"));
  //$categorie = basename("$file", ".txt").PHP_EOL;
  echo "<br>";
  while($line = fgets($vocFile)){
    //echo $line."\r\n";
    if ($line[0] == "*") {
      $categorie = trim(substr($line, 1));
      echo $categorie."\r\n";
      addCategorie($categorie);
    }else if(trim($line) !== ""){
      //echo "\r\n".trim($line)." Trimmed\r\n";
      $german = trim(explode("//", $line)[0]);
      $italian = trim(explode("//", $line)[1]);
      addVocabulary($categorie, $german, $italian);
      echo "<br>";
      // $_POST['action'] = "newText";
      // $_POST['german'] = $german;
      // $_POST['italian'] = $italian;
      // $_POST['categorie'] = $categorie;
      // $_POST['level'] = 1;
    }

  }

  fclose($vocFile);
}



echo "PHP File";
if (isset($_POST['action'])) {
  if ($_POST['action'] == "newText") {
    $german = $_POST['german'];
    $italian = $_POST['italian'];
    $categorie = $_POST['categorie'];
    $pathStr = "$"."data";
    $level = $_POST['level'];
    addVocabulary($categorie[0], $german, $italian);
    //echo $pathStr;
    print_r($_POST);
    //print_r($categorie);

  //   $data = json_decode(file_get_contents('../Vocabulary2.json'), true);
  //
  //   for ($i = 0; $i < $level; $i++) {
  //     $pathStr .= "['".$categorie[$i]."']";
  //   }
  //   //echo $pathStr."<br>";
  //   $i = 0;
  //   eval(" $"."keys = array_keys(".$pathStr.");");
  //   //var_dump( $keys);
  //   while (in_array($i, $keys)) {
  //     //echo "--keys: ".$keys[$i];
  //     //echo "--i: ".$i;
  //     $i++;
  //   }
  //   $pathStr .= "[".$i."] = ['".$german."', '".$italian."'];";
  //   eval($pathStr);
  //
  //   file_put_contents('../Vocabulary2.json', json_encode($data));
  }

  if ($_POST['action'] == "newCategorie") {
    addCategorie($_POST['newCategorie']);
  }
}
// $german = "HEYY";
// $italian = "YOUUUU";
// $categorie = "Hotel";
//
$data = json_decode(file_get_contents('../Vocabulary2.json'), true);

//$data["Haus"] = [];
//
// $i = 0;
// $pathStr = "$"."data";
// eval(" $"."keys = array_keys(".$pathStr.");");
// var_dump( $keys);
// while (in_array($i, $keys)) {
//   $i++;
//   echo $i;
// }

// while (!array_key_exists($i, $keys)) {
//   //$i++;
//   echo $i;
// }
// while($data['vocabulary'][0]['Test'][$i] != ""){
//   $i++;
// }
// $data['vocabulary'][0]['Test'][$i] = [$german, $italian];
//$data[0] = ["1.1.234", "1.234.1"];

// echo "DATA: ";
// $string = "['Hotel']";
// $actualPath = ['Hotel', 'Anmelden', "sub3"];
//
// $pathStr = "$"."data";
// $level = 2;
// for ($i = 0; $i < $level; $i++) {
//   $pathStr .= "['".$actualPath[$i]."']";
// }
// echo $pathStr."<br>";
// $pathStr .= "= ['".$german."', '".$italian."'];";
// echo $pathStr."<br>";
// eval($pathStr);
// var_dump($data['Hotel']['Anmelden']);
//var_dump($data);
//print_r($path);
//print_r($data[$path[0]][$path[1]]);
// for ($i=0; $i < $level; $i++) {
//   $data[$path[0]][$path[1]]
// }
// $data = array(
//   $path[0] => array(
//     "dlfklsd" => "basdask"
//   )
// );
// var_dump($array);
// echo "s \n";
// var_dump($data['Hotel'])
//echo "$"."data".$string.";";
//eval("print_r($"."data".$string.");");
// echo "$"."data".$string."[5]=['".$german."','".$italian."'];";
// eval("$"."data".$string."[5]=['".$german."','".$italian."'];");
// eval("print_r($"."data".$string.");");
// //print_r($data['Hotel']);
//print_r($data);
file_put_contents('../Vocabulary2.json', json_encode($data));

function addCategorie($newCategorie)
{
  $pathStr = "$"."data";
  $level = 0;
  $data = json_decode(file_get_contents('../Vocabulary2.json'), true);
  $pathStr .= "[".$newCategorie."] = [];";
  eval($pathStr);
  file_put_contents('../Vocabulary2.json', json_encode($data));
}

function addVocabulary($categorie, $newGerman, $newItalian){
  $level = 1;
  $pathStr = "$"."data";

  $data = json_decode(file_get_contents('../Vocabulary2.json'), true);

  for ($i = 0; $i < $level; $i++) {
    $pathStr .= "['".$categorie."']";
  }

  eval(" $"."keys = array_keys(".$pathStr.");");
  //var_dump( $keys);
  $i = 0;
  while (in_array($i, $keys)) {
    echo "--keys: ".$keys[$i];
    //echo "--i: ".$i;
    $i++;
  }
  $pathStr .= "[".$i."] = ['".$newGerman."', '".$newItalian."'];";
  eval($pathStr);
  file_put_contents('../Vocabulary2.json', json_encode($data));

}


 ?>
