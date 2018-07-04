<?php
	$_SESSION["phone"] = $_POST['phone'];
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
	<button>Submit</button>
</form>
