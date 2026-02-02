<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Get the form data
    $firstName = htmlspecialchars($_POST['first-name']);
    $lastName  = htmlspecialchars($_POST['last-name']);
    $email     = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $subject   = htmlspecialchars($_POST['subject']);
    $message   = htmlspecialchars($_POST['message']);
    
    // Check if newsletter was checked
    $newsletter = isset($_POST['newsletter']) ? "Ja" : "Nej";

    // 2. Configure email settings
    $to = "your@email.com"; // <--- CHANGE THIS TO YOUR EMAIL
    $email_subject = "Nytt meddelande från: " . $firstName . " " . $lastName;
    
    // 3. Build the email body
    $email_body = "Du har fått ett nytt meddelande från din hemsida.\n\n".
                  "Namn: $firstName $lastName\n".
                  "E-post: $email\n".
                  "Ämne: $subject\n".
                  "Nyhetsbrev: $newsletter\n\n".
                  "Meddelande:\n$message";

    // 4. Set headers
    $headers = "From: no-reply@yourwebsite.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    // 5. Send the email
    if (mail($to, $email_subject, $email_body, $headers)) {
        // Success: Redirect back to contact page with success message
        echo "<script>alert('Tack! Ditt meddelande har skickats.'); window.location.href='contact.html';</script>";
    } else {
        // Error
        echo "<script>alert('Något gick fel. Försök igen.'); window.location.href='contact.html';</script>";
    }
}
?>