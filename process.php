<?php

    $log = array();

    $function   = $_POST['function'];
    $file       = $_POST['file'];
    $user       = $_POST["user"];
    $msg        = $_POST["msg"];
   $datetime   = $_POST["datetime"];
    $state      = $_POST["state"];
    $contexts   = $_POST["data"];
    $count      = 0;

    switch($function) {

        case('STATE'):  
            if( file_exists($file) ) {
                $lines = file($file);
            }
            $log['state'] = count($lines);
        break;   
    
        case('UPDAT'): 
            
            if ( file_exists($file) ) {
                $lines = file($file);
            }
            $count = count($lines);

            if($state == $count) {
                $log["state"] = $state;
                $log['log'] = false;
            } else {
                $data = file_get_contents($file);
                $data = json_decode($data, true);
                $log = $data;
            }
  
        break;
        
        case ('SEND'):
            if( file_exists($file) ) {
                $file_con = file_get_contents($file);
                $json = json_decode($file_con, true);
                $array = array(
                    "author" => $user,
                    "message" => $msg,
                    "datetime" => $datetime
                );
                array_push($json["log"], $array);
                $final_data = json_encode($json);
                file_put_contents($file, $final_data);
            } 
        break;
       

    };

    echo json_encode($log);
?>

