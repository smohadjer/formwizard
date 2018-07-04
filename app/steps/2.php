<?php
	$_SESSION["name"] = $_POST['name'];
	$_SESSION["email"] = $_POST['email'];
?>
<form method="post" action="form.php?step=3">
	<div>
		<label class="required" for="phone">Phone:</label>
		<input id="phone" name="phone" type="tel" required />
	</div>
	<button>Next</button>
</form>
