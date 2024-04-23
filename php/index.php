<?php
// CE DOCUMENT S'OCCUPE DE GÉRER TOUT LES API COTÉ SERVEUR
// (il est un copié collé de celui présent dans le dossier htdocs du serveur local XAMPP)
	if (!empty($_SERVER['HTTPS']) && ('on' == $_SERVER['HTTPS'])) {
		$uri = 'https://';
	} else {
		$uri = 'http://';
	}
	$uri .= $_SERVER['HTTP_HOST'];
	header('Location: '.$uri.'/dashboard/');
	exit;
?>
Something is wrong with the XAMPP installation :-(
