
<?php
if (isset($_POST['submit'])) {
  $to = $_POST['email'];
  $subject = "Reset Password";
  $message = "We received a request to reset your password. Click the link below to reset your password:\n\nhttps://example.com/resetpassword.php";

  // Optional headers
  $headers = "From: support@example.com" . "\r\n" .
             "Reply-To: support@example.com" . "\r\n" .
             "X-Mailer: PHP/" . phpversion();

  // Send email
  if (mail($to, $subject, $message, $headers)) {
    echo "<p>A reset password email has been sent to your email address.</p>";
  } else {
    echo "<p>There was a problem sending the email. Please try again later.</p>";
  }
}
?>