<form class="fromwizard__ajaxForm formwizard__step" method="post" action="xt_form.php?step=2.5">
	<h2>Step 2.5</h2>
	<?php
		if ( isset($_SESSION["error"]) && $_SESSION["error"] ) {
			echo '<p class="error">There is an error on the form!</p>';
		}
	?>
	<div>
		<input type="hidden" name="nextstep" value="3" />
		<label class="required" for="phone">Fax:</label>
		<input id="fax" name="fax" type="tel" required="required" value="<?= isset($_SESSION['fax']) ? $_SESSION['fax'] : '' ?>" />
	</div>
	<div class="buttons">
		<a class="fromwizard__ajaxLink" href="form.php?step=2">Back</a>
		<button>Next</button>
	</div>
</form>
