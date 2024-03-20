<?php

$servername = "localhost";
$username = "root"; // Nom d'utilisateur par défaut pour MySQL avec XAMPP
$password = ""; // Mot de passe vide par défaut pour MySQL avec XAMPP
$db = "equipe405";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$db;charset=utf8mb4;unix_socket=/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock", $username, $password);
    // Définir le mode d'erreur PDO sur exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connecté avec succès"; // Afficher un message de succès
} catch (PDOException $e) {
    echo "Échec de la connexion : " . $e->getMessage();
}
