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
				min-width: 220px;
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
				background: #ddd;
				padding: 20px;
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
					const formWizard = new FormWizard({
						element: document.querySelector('.formwizard'),
						ajaxFormClass: 'fromwizard__ajaxForm',
						stepClass: 'formwizard__step',
						backButtonClass: 'fromwizard__back'
					});
				});
			})();
		</script>
	</body>
</html>
