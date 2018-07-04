<?php
	if ( isset($_POST['phone']) ) {
		$_SESSION["phone"] = $_POST['phone'];
	}
?>
<form method="post" action="confirmation.php">
	<div class="review">
		<p><?php echo 'Name: ' . $_SESSION['name']; ?></p>
		<p><?php echo 'Email: ' . $_SESSION['email']; ?></p>
		<p><?php echo 'Phone: ' . $_SESSION['phone']; ?></p>
	</div>
	<div>
		<input type="checkbox" id="confirm" name="confirm" required />
		<label for="confirm">I agree that above information is accurate!</label>
	</div>
	<div class="buttons">
		<a href="form.php?step=2">Back</a>
		<button>Submit</button>
	</div>
</form>
