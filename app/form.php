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
		<!-- below styles are not required -->
		<style>
			form input {
				padding: 5px;
			}

			form .error {
				color: red;
			}

			form input:invalid {
				border: solid 1px salmon;
			}

			form input[type=text],
			form input[type=email] {
				min-width: 200px;
			}

			form label.required::after {
				content: "*";
				color: #999;
				margin-left: 3px;
			}

			form fieldset {
				padding: 20px;
				border-radius: 5px;
				border: dashed #999 1px;
			}

			form button, .buttons a {
				padding: 5px 20px;
				border-radius: 5px;
				margin-top: 20px;
				font-size: 1.5em;
			}

			form label {
				margin-right: 10px;
			}

			form div + div {
				margin-top: 10px;
			}

			.review {
				border-bottom: solid 2px #fff;
				margin-bottom: 20px;
				padding-bottom: 10px;
			}

			.review p {
				margin: 0 0 10px;
			}

			.formwizard {
				width: 320px;
				padding: 20px;
				box-sizing: border-box;
				overflow: hidden;
				position: relative;
				min-height: 500px;
			}

			.formwizard__step {
				box-sizing: border-box;
				background: #ddd;
				padding: 20px;
				width: 100%;
				position: absolute;
				transition: left .75s cubic-bezier(.07,.54,.41,.99);
				left: 0;
				top: 0;
			}

			.formwizard__step.outLeft {
				left: -340px;
			}

			.formwizard__step.outRight {
				left: 340px;
			}
		</style>
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
