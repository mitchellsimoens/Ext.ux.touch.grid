<?php

$callback = false;

if (isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
}

$start   = $_REQUEST['start'];
$limit   = $_REQUEST['limit'];
$data    = array(
    array( "firstName" => "Tommy", "lastName" => "Maintz" ),
    array( "firstName" => "Ed", "lastName" => "Spencer" ),
    array( "firstName" => "Jamie", "lastName" => "Avins" ),
    array( "firstName" => "Aaron", "lastName" => "Conran" ),
    array( "firstName" => "Dave", "lastName" => "Kaneda" ),
    array( "firstName" => "Michael", "lastName" => "Mullany" ),
    array( "firstName" => "Abraham", "lastName" => "Elias" ),
    array( "firstName" => "Jay", "lastName" => "Robinson" ),
    array( "firstName" => "Tommy", "lastName" => "Maintz" ),
    array( "firstName" => "Ed", "lastName" => "Spencer" ),
    array( "firstName" => "Jamie", "lastName" => "Avins" ),
    array( "firstName" => "Aaron", "lastName" => "Conran" ),
    array( "firstName" => "Ape", "lastName" => "Evilias" ),
    array( "firstName" => "Dave", "lastName" => "Kaneda" ),
    array( "firstName" => "Michael", "lastName" => "Mullany" ),
    array( "firstName" => "Abraham", "lastName" => "Elias" ),
    array( "firstName" => "Jay", "lastName" => "Robinson" ),
    array( "firstName" => "Tommy", "lastName" => "Maintz" ),
    array( "firstName" => "Ed", "lastName" => "Spencer" ),
    array( "firstName" => "Jamie", "lastName" => "Avins" ),
    array( "firstName" => "Aaron", "lastName" => "Conran" ),
    array( "firstName" => "Dave", "lastName" => "Kaneda" ),
    array( "firstName" => "Michael", "lastName" => "Mullany" ),
    array( "firstName" => "Abraham", "lastName" => "Elias" ),
    array( "firstName" => "Jay", "lastName" => "Robinson" ),
    array( "firstName" => "Tommy", "lastName" => "Maintz" ),
    array( "firstName" => "Ed", "lastName" => "Spencer" ),
    array( "firstName" => "Jamie", "lastName" => "Avins" ),
    array( "firstName" => "Aaron", "lastName" => "Conran" ),
    array( "firstName" => "Dave", "lastName" => "Kaneda" ),
    array( "firstName" => "Michael", "lastName" => "Mullany" ),
    array( "firstName" => "Abraham", "lastName" => "Elias" ),
    array( "firstName" => "Jay", "lastName" => "Robinson" ),
    array( "firstName" => "Tommy", "lastName" => "Maintz" ),
    array( "firstName" => "Ed", "lastName" => "Spencer" ),
    array( "firstName" => "Jamie", "lastName" => "Avins" ),
    array( "firstName" => "Aaron", "lastName" => "Conran" ),
    array( "firstName" => "Dave", "lastName" => "Kaneda" ),
    array( "firstName" => "Michael", "lastName" => "Mullany" ),
    array( "firstName" => "Abraham", "lastName" => "Elias" ),
    array( "firstName" => "Jay", "lastName" => "Robinson" ),
    array( "firstName" => "Tommy", "lastName" => "Maintz" ),
    array( "firstName" => "Ed", "lastName" => "Spencer" ),
    array( "firstName" => "Jamie", "lastName" => "Avins" ),
    array( "firstName" => "Aaron", "lastName" => "Conran" ),
    array( "firstName" => "Ape", "lastName" => "Evilias" ),
    array( "firstName" => "Dave", "lastName" => "Kaneda" ),
    array( "firstName" => "Michael", "lastName" => "Mullany" ),
    array( "firstName" => "Abraham", "lastName" => "Elias" ),
    array( "firstName" => "Jay", "lastName" => "Robinson" ),
    array( "firstName" => "Tommy", "lastName" => "Maintz" ),
    array( "firstName" => "Ed", "lastName" => "Spencer" ),
    array( "firstName" => "Jamie", "lastName" => "Avins" ),
    array( "firstName" => "Aaron", "lastName" => "Conran" ),
    array( "firstName" => "Dave", "lastName" => "Kaneda" ),
    array( "firstName" => "Michael", "lastName" => "Mullany" ),
    array( "firstName" => "Abraham", "lastName" => "Elias" ),
    array( "firstName" => "Jay", "lastName" => "Robinson" ),
    array( "firstName" => "Tommy", "lastName" => "Maintz" ),
    array( "firstName" => "Ed", "lastName" => "Spencer" ),
    array( "firstName" => "Jamie", "lastName" => "Avins" ),
    array( "firstName" => "Aaron", "lastName" => "Conran" ),
    array( "firstName" => "Dave", "lastName" => "Kaneda" ),
    array( "firstName" => "Michael", "lastName" => "Mullany" ),
    array( "firstName" => "Abraham", "lastName" => "Elias" ),
    array( "firstName" => "Jay", "lastName" => "Robinson" ),
    array( "firstName" => "Tommy", "lastName" => "Maintz" ),
    array( "firstName" => "Ed", "lastName" => "Spencer" ),
    array( "firstName" => "Jamie", "lastName" => "Avins" ),
    array( "firstName" => "Aaron", "lastName" => "Conran" ),
    array( "firstName" => "Dave", "lastName" => "Kaneda" ),
    array( "firstName" => "Michael", "lastName" => "Mullany" ),
    array( "firstName" => "Abraham", "lastName" => "Elias" ),
    array( "firstName" => "Jay", "lastName" => "Robinson" ),
    array( "firstName" => "Tommy", "lastName" => "Maintz" ),
    array( "firstName" => "Ed", "lastName" => "Spencer" ),
    array( "firstName" => "Jamie", "lastName" => "Avins" ),
    array( "firstName" => "Aaron", "lastName" => "Conran" ),
    array( "firstName" => "Ape", "lastName" => "Evilias" ),
    array( "firstName" => "Dave", "lastName" => "Kaneda" ),
    array( "firstName" => "Michael", "lastName" => "Mullany" ),
    array( "firstName" => "Abraham", "lastName" => "Elias" ),
    array( "firstName" => "Jay", "lastName" => "Robinson" ),
    array( "firstName" => "Tommy", "lastName" => "Maintz" ),
    array( "firstName" => "Ed", "lastName" => "Spencer" ),
    array( "firstName" => "Jamie", "lastName" => "Avins" ),
    array( "firstName" => "Aaron", "lastName" => "Conran" ),
    array( "firstName" => "Dave", "lastName" => "Kaneda" ),
    array( "firstName" => "Michael", "lastName" => "Mullany" ),
    array( "firstName" => "Abraham", "lastName" => "Elias" ),
    array( "firstName" => "Jay", "lastName" => "Robinson" ),
    array( "firstName" => "Tommy", "lastName" => "Maintz" ),
    array( "firstName" => "Ed", "lastName" => "Spencer" ),
    array( "firstName" => "Jamie", "lastName" => "Avins" ),
    array( "firstName" => "Aaron", "lastName" => "Conran" ),
    array( "firstName" => "Dave", "lastName" => "Kaneda" ),
    array( "firstName" => "Michael", "lastName" => "Mullany" ),
    array( "firstName" => "Abraham", "lastName" => "Elias" ),
    array( "firstName" => "Jay", "lastName" => "Robinson" ),
    array( "firstName" => "Tommy", "lastName" => "Maintz" ),
    array( "firstName" => "Ed", "lastName" => "Spencer" ),
    array( "firstName" => "Jamie", "lastName" => "Avins" ),
    array( "firstName" => "Aaron", "lastName" => "Conran" ),
    array( "firstName" => "Dave", "lastName" => "Kaneda" ),
    array( "firstName" => "Michael", "lastName" => "Mullany" ),
    array( "firstName" => "Abraham", "lastName" => "Elias" ),
    array( "firstName" => "Jay", "lastName" => "Robinson" ),
    array( "firstName" => "Tommy", "lastName" => "Maintz" ),
    array( "firstName" => "Ed", "lastName" => "Spencer" ),
    array( "firstName" => "Jamie", "lastName" => "Avins" ),
    array( "firstName" => "Aaron", "lastName" => "Conran" ),
    array( "firstName" => "Ape", "lastName" => "Evilias" ),
    array( "firstName" => "Dave", "lastName" => "Kaneda" ),
    array( "firstName" => "Michael", "lastName" => "Mullany" ),
    array( "firstName" => "Abraham", "lastName" => "Elias" ),
    array( "firstName" => "Jay", "lastName" => "Robinson" ),
    array( "firstName" => "Tommy", "lastName" => "Maintz" ),
    array( "firstName" => "Ed", "lastName" => "Spencer" ),
    array( "firstName" => "Jamie", "lastName" => "Avins" ),
    array( "firstName" => "Aaron", "lastName" => "Conran" ),
    array( "firstName" => "Dave", "lastName" => "Kaneda" ),
    array( "firstName" => "Michael", "lastName" => "Mullany" ),
    array( "firstName" => "Abraham", "lastName" => "Elias" ),
    array( "firstName" => "Jay", "lastName" => "Robinson" ),
    array( "firstName" => "Tommy", "lastName" => "Maintz" ),
    array( "firstName" => "Ed", "lastName" => "Spencer" ),
    array( "firstName" => "Jamie", "lastName" => "Avins" ),
    array( "firstName" => "Aaron", "lastName" => "Conran" ),
    array( "firstName" => "Dave", "lastName" => "Kaneda" ),
    array( "firstName" => "Michael", "lastName" => "Mullany" ),
    array( "firstName" => "Abraham", "lastName" => "Elias" ),
    array( "firstName" => "Jay", "lastName" => "Robinson" ),
    array( "firstName" => "Zed", "lastName" => "Zacharias" )
);
$dataset = array();

for ($i = 0; $i < $limit; $i++) {
    $offset = $i + $start;
    if (isset($data[$offset])) {
        array_push($dataset, $data[$offset]);
    }
}

if ($callback) {
    echo $callback . '(';
}

echo json_encode(array("success" => true, "total" => count($data), "data" => $dataset));

if ($callback) {
    echo ');';
}

?>