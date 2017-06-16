<?php

    require_once "recaptchalib.php";
    
        // your secret key
    $secret = "6LcePAATAAAAABjXaTsy7gwcbnbaF5XgJKwjSNwT";

    // empty response
    $response = null;

    // check secret key
    $reCaptcha = new ReCaptcha($secret);

    if ($_POST["g-recaptcha-response"]) {
    $response = $reCaptcha->verifyResponse(
        $_SERVER["REMOTE_ADDR"],
        $_POST["g-recaptcha-response"]
    );
}

    ini_set('SMTP','localhost'); 
    ini_set('sendmail_from', 'hello@courtney-ring.com'); 

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $url = $_POST['url'];
   // $from = 'hello@crawfordcountyhistoricalsociety.com';
    $to = '"Crawford County Historical Society" <museumcchs97@gmail.com>';
    //$to = "ce.ring@comcast.net";
    $subject = 'New Message from CrawfordCountyHistoricalSociety.com';
    
    $message = "From: $name\n E-Mail: $email\n Message:\n $message";
    $headers = 'From: "Crawford County Historical Society" <hello@crawfordcountyhistoricalsociety.com>' . "\r\n" . 'Reply-to:' . $email;

        
    if ($_POST['submit']) {
        if (mail ($to, $subject, $message, $headers)) {
<<<<<<< HEAD
            header("Location: $url");
=======
            header("Location:http://www.courtney-ring.com#contact");
>>>>>>> 243e761b3fe2c29e611fe8fbcde8022318af8056
            //echo '<p class="success">Your message has been sent successfully!</p>';
            //echo '<script>alert();</script>';

       
        } else {
            echo "Error. Please go back and try again.";
          
        }
    }

?>


