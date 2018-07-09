<form class="ajax" method="post" action="xt_form.php?step=1">
	<div>
		<label class="required" for="name">Name:</label>
		<input id="name" name="name" required="required"
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
