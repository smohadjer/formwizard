<?php
	session_start();
	define("TOTAL_STEPS", 3);
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Formwizard | A boilerplate for multi-step forms</title>
		<link rel="stylesheet" href="css/demo.css" />
		<link rel="stylesheet" href="css/slider.css" />
	</head>
	<body>
		<h1>A boilerplate for multi-step single-page forms</h1>

		<div class="formwizard" data-steps-count="3">
			<?php include('nav.inc.php'); ?>
			<div class="formwizard__forms">
				<?php
					if ( isset($_GET["step"]) ) {
						$step = trim($_GET["step"]);
						include('steps/' . $step . '.php');
					} else {
						header('Location: form.php?step=1');
						exit;
					}
				?>
			</div>
		</div>
		<footer>
			<p>To learn more visit <a href="https://github.com/smohadjer/formwizard/blob/master/README.md">repo on Github</a></p>
		</footer>
		<script src="js/formwizard.js"></script>
		<script src="js/slider.js"></script>
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
					const formWizard = new FormWizard({
						element: document.querySelector('.formwizard'),
						ajaxFormClass: 'fromwizard__ajaxForm',
						stepClass: 'formwizard__step',
						backButtonClass: 'fromwizard__back',
						callbackInit: slider.init,
						callbackUpdateView: slider.slide
					});
				});
			})();
		</script>
	</body>
</html>
