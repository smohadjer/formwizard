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
		<link rel="stylesheet" href="resources/formwizard.css" />
	</head>
	<body>
		<div class="formwizard">
			<div class="formwizard__navigation"></div>
			<?php
				if ( isset($_GET["step"]) ) {
					$step = trim($_GET["step"]);
					include('steps/' . $step . '.php');
				}
			?>
		</div>
		<script src="resources/formwizard.js"></script>
		<script>
			(function() {
				'use strict';

				const html = document.querySelector('html');

				html.classList.add('js');

				function ready(fn) {
					if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
						fn();
					} else {
						document.addEventListener('DOMContentLoaded', fn);
					}
				}

				ready(function() {
					const formWizard = new FormWizard();
				});
			})();
		</script>
	</body>
</html>
