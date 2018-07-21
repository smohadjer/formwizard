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
		<link rel="stylesheet" href="demo.css" />
	</head>
	<body>
		<h1>A boilerplate for multi-step single-page forms</h1>
		<div class="formwizard">
			<?php include('nav.inc.php'); ?>
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
		<footer>
			<p>To learn more visit <a href="https://github.com/smohadjer/formwizard/blob/master/README.md">repo on Github</a></p>
		</footer>
		<script src="formwizard.js"></script>
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
					const myCallback = function(options) {
						const oldForm = options.oldForm;
						const newForm = options.newForm;
						const direction = (options.oldStep < options.newStep) ? 'forward' : 'backward';

						oldForm.addEventListener('transitionend', removeOldForm);

						function removeOldForm(event) {
							event.target.remove();
							oldForm.removeEventListener('transitionend', removeOldForm);
						}

						if (direction === 'forward') {
							oldForm.classList.add('outLeft');
							newForm.classList.add('outRight');

							// if newForm does't exist in page append it otherwise update it
							this.element.appendChild(newForm);

							// triggering reflow otherwise removing class won't trigger animation
							void newForm.offsetWidth;

							newForm.classList.remove('outRight');

							/*
							window.setTimeout(function() {
								newForm.classList.remove('outRight');
							}, 10);
							*/
						} else {
							oldForm.classList.add('outRight');
							newForm.classList.add('outLeft');

							// if newForm does't exist in page append it otherwise update it
							this.element.appendChild(newForm);

							// triggering reflow otherwise removing class won't trigger animation
							void newForm.offsetWidth;
							newForm.classList.remove('outLeft');

							/*
							window.setTimeout(function() {
								newForm.classList.remove('outLeft');
							}, 10);
							*/
						}
					};

					const formWizard = new FormWizard({
						element: document.querySelector('.formwizard'),
						ajaxFormClass: 'fromwizard__ajaxForm',
						stepClass: 'formwizard__step',
						backButtonClass: 'fromwizard__back',
						callbackUpdateView: myCallback
					});
				});
			})();
		</script>
	</body>
</html>
