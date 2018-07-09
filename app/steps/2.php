<form class="ajax" method="post" action="xt_form.php?step=2">
	<div>
		<label class="required" for="phone">Phone:</label>
		<input id="phone" name="phone" type="tel" required 
            value="<?= isset($_SESSION['phone']) ? $_SESSION['phone'] : '' ?>" />
	</div>
	<div class="buttons">
		<a class="back" href="form.php?step=1">Back</a>
		<button>Next</button>
	</div>
</form>
