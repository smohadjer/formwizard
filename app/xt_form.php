<?php
	session_start();

	if ( isset($_GET["step"]) ) {
		$step = trim($_GET["step"]);
	}

	if ( isset($_POST["nextstep"]) ) {
		$nextstep = ($_POST["nextstep"]);
	}

	$error = false;
	$thisStep = 'form.php?step=' . $step;
	$nextStep = 'form.php?step=' . $nextstep;

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
		case 2.5:
			if ( isset($_POST['fax']) ) {
				$_SESSION["fax"] = $_POST['fax'];
			}
			break;
		case 3:
			if ( isset($_POST['code']) && isset($_POST['qty']) ) {
				$_SESSION["items"][] = array('code' => $_POST['code'],
					'qty' => $_POST['qty']);
				$nextStep = $thisStep;
			} elseif ( count($_POST) > 0 ) {
				//$error = true;
			}
			break;
	}

	$_SESSION["error"] = $error;
	if ($error) {
		header("Location: {$thisStep}");
	} else {
		header("Location: {$nextStep}");
	}
	exit;
?>
