<form class="fromwizard__ajaxForm formwizard__step" method="post" action="xt_form.php?step=3">
	<?php
		if ( isset($_SESSION["error"]) && $_SESSION["error"] ) {
			echo '<p class="error">There is an error on the form!</p>';
		}
	?>
	<?php
		if ( isset($_GET["mode"]) && ( trim($_GET["mode"]) == 'add' ) ) {
	?>
			<h2>Step 3 - sub-step 2</h2>
			<div>
				<label class="required" for="code">Item Code:</label>
				<input type="text" id="code" name="code" required="required" value="" />
			</div>
			<div>
				<label class="required" for="qty">Item Quantity:</label>
				<input id="qty" name="qty" type="text" required="required" value="" />
			</div>
			<div class="buttons">
				<a class="fromwizard__ajaxLink" href="form.php?step=3">Back</a>
				<button>Next</button>
			</div>
	<?php
		} else {
	?>

			<h2>Step 3 - sub-step 1</h2>
			<table border="1">
				<tr>
					<th>Item Code</th>
					<th>Item Quantity</th>
				</tr>
	<?php
		if ( isset($_SESSION["items"]) ) {
			foreach ( $_SESSION["items"] as $item ) {
				echo "<tr><td>{$item['code']}</td><td>{$item['qty']}</td></tr>";
			}
		}
	?>
			</table>
			<p><a class="fromwizard__ajaxLink" href="form.php?step=3&mode=add">Add Item</a></p>
			<div class="buttons">
				<a class="fromwizard__ajaxLink" href="form.php?step=2">Back</a>
				<button>Next</button>
			</div>
	<?php
		}
	?>
</form>
