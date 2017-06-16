<?php

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $captcha - $_POST['g-recaptcha-response'];

    if(!$captcha){
          echo '<h2>Please check the the captcha form.</h2>';
          exit;
    }

    $secretKey = "6LeyoiUUAAAAACOQvKdCqAl0ZuPWyR3vRrd_Rjby";
    $ip = $_SERVER['REMOTE_ADDR'];
    $response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secretKey."&response=".$captcha."&remoteip=".$ip);
    $responseKeys = json_decode($response,true);
    if(intval($responseKeys["success"]) !== 1) {
          echo '<h2>You are spammer ! Get the @$%K out</h2>';
    } else {
          echo '<h2>Thanks for posting comment.</h2>';
        }

        
   // $from = 'hello@crawfordcountyhistoricalsociety.com';
    $to = '"Courtney-Ring.com" <ce.ring@comcast.net>';
    //$to = "ce.ring@comcast.net";
    $subject = 'New Message from Courtney-Ring.com';
    
    $message = "From: $name\n E-Mail: $email\n Message:\n $message";
    $headers = 'From: "Courtney-Ring.com" <hello@courtney-ring.com>' . "\r\n" . 'Reply-to:' . $email;

        
    if ($_POST['submit']) {
        if (mail ($to, $subject, $message, $headers)) {
            header("Location:http://www.courtney-ring.com#contact");
            //echo '<p class="success">Your message has been sent successfully!</p>';
            //echo '<script>alert();</script>';

       
        } else {
            echo "Error. Please go back and try again.";
          
        }
    }

?>


