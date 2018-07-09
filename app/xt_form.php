<?php
	session_start();

	if ( isset($_GET["step"]) ) {
		$step = trim($_GET["step"]);
	}

	$error = false;

	switch ($step) {
		case 1:
			if ( isset($_POST['name']) ) {
				$_SESSION["name"] = $_POST['name'];
			}

			// validation code
			if ( strlen($_POST['name']) < 3 ) {
				$error = true;
			}

			if ( isset($_POST['email']) ) {
				$_SESSION["email"] = $_POST['email'];
			}
			break;
		case 2:
			if ( isset($_POST['phone']) ) {
				$_SESSION["phone"] = $_POST['phone'];
			}
			break;
	}

	$_SESSION["error"] = $error;
	if ($error) {
		header('Location: form.php?step=' . $step);
	} else {
		header('Location: form.php?step=' . ++$step);
	}
	exit;
?>
