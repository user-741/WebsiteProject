<!DOCTYPE html>
<html>
<head>
    <title>Profile Page</title>
</head>
<body>
    <h1>Profile Page</h1>
    <?php
    // start session
    session_start();

    // check if user is logged in and retrieve email and account status
    if(isset($_SESSION['email'])) {
        $email = $_SESSION['email'];
        $status = $_SESSION['status'];
        echo '<p>Welcome, '.$email.'!</p>';
        echo '<p>Your account status is '.$status.'.</p>';
    } else {
        // user is not logged in, redirect to login page
        header('Location: index.html');
        exit();
    }
    ?>
</body>
</html>