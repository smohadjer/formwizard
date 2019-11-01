<ul class="formwizard__nav">
<?php
	if ( isset($_GET["step"]) ) {
		$step = trim($_GET["step"]);
	}

	for ($i=0; $i < count($allSteps); $i++) {
		echo '<li>';
		if ( $allSteps[$i] > $step ) {
			echo "<span>Step {$allSteps[$i]}</span>";
		} else if ($allSteps[$i] == $step) {
			echo "<span class=\"selected\">Step {$allSteps[$i]}</span>";
		} else {
			echo "<a class=\"fromwizard__ajaxLink\" href=\"form.php?step={$allSteps[$i]}\">Step {$allSteps[$i]}</a>";
		}
		echo '</li>';
	}
?>
</ul>
