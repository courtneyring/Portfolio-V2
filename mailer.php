<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];


    $to = '"Courtney Ring" <ce.ring@comcast.net>';
    //$to = "ce.ring@comcast.net";
    $subject = 'New Message Sent To Courtney-Ring.com';
    
    $message = "From: $name\n E-Mail: $email\n Message:\n $message";
    $headers = 'From: "Courtney-Ring.com" <hello@courtney-ring.com>' . "\r\n" . 'Reply-to:' . $email;

        
    if ($_POST['submit']) {
        if (mail ($to, $subject, $body, $from)) {
            
            header("location:http://courtney-ring.com#contact");

       
        } else {
            echo "Error. Please go back and try again.";
          
        }
    }

?>


