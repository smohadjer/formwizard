<ul>
<?php
	if ( isset($_GET["step"]) ) {
		$step = trim($_GET["step"]);
	}

	for ($i=1; $i <= TOTAL_STEPS; $i++) {
		echo '<li>';
		if ( $i >= $step ) {
			echo "<span>Step {$i}</span>";
		} else {
			echo "<a href=\"form.php?step={$i}\">Step {$i}</a>";
		}
		echo '</li>';
	}
?>
</ul>