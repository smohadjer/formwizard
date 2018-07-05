<?php
	if ( isset($_POST['name']) ) {
		$_SESSION["name"] = $_POST['name'];
	}

	if ( isset($_POST['email']) ) {
		$_SESSION["email"] = $_POST['email'];
	}
?>
<form class="ajax" method="post" action="form.php?step=3">
	<div>
		<label class="required" for="phone">Phone:</label>
		<input id="phone" name="phone" type="tel" required value="<?php echo $_SESSION['phone']; ?>" />
	</div>
	<div class="buttons">
		<a class="back" href="form.php?step=1">Back</a>
		<button>Next</button>
	</div>
</form>
