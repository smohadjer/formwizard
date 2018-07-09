<form class="ajax" method="post" action="xt_form.php?step=2">
	<?php
		if ( isset($_SESSION["error"]) && $_SESSION["error"] ) {
			echo '<p class="error">There is an error on the form!</p>';
		}
	?>
	<div>
		<label class="required" for="phone">Phone:</label>
		<input id="phone" name="phone" type="tel" required="required" value="<?= isset($_SESSION['phone']) ? $_SESSION['phone'] : '' ?>" />
	</div>
	<div class="buttons">
		<a class="back" href="form.php?step=1">Back</a>
		<button>Next</button>
	</div>
</form>
