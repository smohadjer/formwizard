<?php
	session_start();
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Formwizard | A boilerplate for multi-step forms</title>
		<link rel="stylesheet" href="resources/form.css" />
	</head>
	<body>
		<div class="formwizard">
			<div class="formwizard__navigation"></div>
			<?php
                if ( isset($_SESSION["error"]) && $_SESSION["error"] ) {
                    echo "<p>There is an error on the form!</p>";
                }
				if ( isset($_GET["step"]) ) {
					$step = trim($_GET["step"]);
					include('steps/' . $step . '.php');
				}
			?>
		</div>
		<script src="resources/form.js"></script>
	</body>
</html>
