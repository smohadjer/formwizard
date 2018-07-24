<?php
	if ( !isset($_GET["step"]) ) {
		header('Location: form.php?step=1');
		exit;
	}
	session_start();
	define("TOTAL_STEPS", 4);
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Formwizard | <?= 'Step ' . trim($_GET["step"]) ?></title>
		<!-- demo styles are optional -->
		<link rel="stylesheet" href="css/demo.css" />

		<!-- optional styles for slider version -->
		<link rel="stylesheet" href="css/slider.css" />

		<script type="module">
			import FormWizard from './js/formwizard.js';

			//optional module for slide effect -->
			import {slide, init} from './js/modules/slide.js';

			new FormWizard({
				element: document.querySelector('.formwizard'),
				callbackInit: init, //use this callback if you need additional initializations
				callbackUpdateView: slide //use this callback to apply transiton effect when moving from one step to another
			});
		</script>
	</head>
	<body>
		<h1>A boilerplate for multi-step single-page forms</h1>
		<div class="formwizard" data-steps-count="<?php echo TOTAL_STEPS ?>">
			<?php include('nav.inc.php'); ?>
			<div class="formwizard__forms">
				<?php
					$step = trim($_GET["step"]);
					include('steps/' . $step . '.php');
				?>
			</div>
		</div>
		<footer>
			<p>To learn more visit <a href="https://github.com/smohadjer/formwizard/blob/master/README.md">repo on Github</a></p>
		</footer>
	</body>
</html>
