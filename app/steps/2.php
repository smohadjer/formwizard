<?php
	$_SESSION["name"] = $_POST['name'];
	$_SESSION["email"] = $_POST['email'];
?>
<form method="post" action="form.php?step=3">
	<div>
		<label class="required" for="phone">Phone:</label>
		<input id="phone" name="phone" type="tel" required value="<?php echo $_SESSION['phone']; ?>" />
	</div>
	<div class="buttons">
		<a href="form.php?step=1">Back</a>
		<button>Next</button>
	</div>
</form>
