<form class="ajax" method="post" action="form.php?step=2">
	<div>
		<label class="required" for="name">Name:</label>
		<input id="name" name="name" required value="<?php echo $_SESSION['name']; ?>" />
	</div>
	<div>
		<label class="required" for="email">Email:</label>
		<input id="email" name="email" type="email" required value="<?php echo $_SESSION['email']; ?>" />
	</div>
	<div class="buttons">
		<button>Next</button>
	</div>
</form>
