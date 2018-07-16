Formwizard workflow

User comes to form.php?step=2, js is enabled
Get step count from url and store it in currentStep variable.
Read the total steps from data-total-steps and add placeholder form elements to DOM for all missing steps.

A) User clicks on back link
B) User clicks on next button
C) User clicks on browser back or forward button
D) User clicks on a link in form navigation

---------

A) User clicks on back link
var step = currentStep - 1;
fetchView(step);

B) User clicks on next button
- Submit form data with ajax POST to server
- When response is received set step to data-step on form in response.
if (step === currentStep) {
	//server has found error and returned the same step with errors in markup
	replace form with new form in response.
} else {
	updateView(step, response);
}

C) User clicks on browser back or forward button
window.onpopstate = function(event) {
	if (event.state) {
		step = event.state.step;
		fetchView(step);
	}
};

D) User clicks on a link in form navigation
var step = get step parameter from href of link;
fetchView(step);

---------

function postView() {

}

function fetchView(step) {
	fetch form.php?step=step using ajax (GET)
	when response is received invoke updateView(step, response);
}

function updateView(step, response) {
	replace form with index of step -1 with form in response
	goToSlide(step);
	currentStep = step;
}
