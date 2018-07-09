<form method="post" action="confirmation.php">
	<?php
		if ( isset($_SESSION["error"]) && $_SESSION["error"] ) {
			echo '<p class="error">There is an error on the form!</p>';
		}
	?>
	<div class="review">
		<p><?php echo 'Name: ' . $_SESSION['name']; ?></p>
		<p><?php echo 'Email: ' . $_SESSION['email']; ?></p>
		<p><?php echo 'Phone: ' . $_SESSION['phone']; ?></p>
	</div>
	<div>
		<input type="checkbox" id="confirm" name="confirm" required="required" />
		<label for="confirm">I agree that above information is accurate!</label>
	</div>
	<div class="buttons">
		<a class="back" href="form.php?step=2">Back</a>
		<button>Submit</button>
	</div>
</form>
