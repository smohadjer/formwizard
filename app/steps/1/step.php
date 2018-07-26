<form class="fromwizard__ajaxForm formwizard__step" method="post" action="xt_form.php?step=1">
	<h2>Step 1</h2>
	<?php
		if ( isset($_SESSION["error"]) && $_SESSION["error"] ) {
			echo '<p class="error">There is an error on the form!</p>';
		}
	?>
	<div>
		<input type="hidden" name="nextstep" value="2" />
		<label class="required" for="name">Name:</label>
		<input type="text" id="name" name="name" required="required" placeholder="longer than two letters"
			value="<?= isset($_SESSION['name']) ? $_SESSION['name'] : '' ?>" />
	</div>
	<div>
		<label class="required" for="email">Email:</label>
		<input id="email" name="email" type="email" required="required"
			value="<?= isset($_SESSION['email']) ? $_SESSION['email'] : '' ?>" />
	</div>
	<div class="buttons">
		<button>Next</button>
	</div>
</form>
