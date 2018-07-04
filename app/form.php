<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Multi-step SPA Form (prototype)</title>
		<link rel="stylesheet" href="form.css" />
	</head>
	<body>
		<div class="app">
			<form method="post" action="form.php">
				<?php include('steps/1.php') ?>
				<button>Next</button>
			</form>
			<div class="app__nav" hidden>
				<button class="app__back">Back</button>
				<button class="app__next">Next</button>
			</div>
		</div>
		<script src="form.js"></script>
	</body>
</html>
