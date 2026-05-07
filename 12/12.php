<?php
session_start();
if (isset($_SESSION['user_name']) && isset($_SESSION['user_email']) {
    header('Location: profile.php');
    exit;
} else {
    header('Location: register.php');
}
?>