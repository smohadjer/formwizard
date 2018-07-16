Formwizard workflow

* User comes to form.php?step=2, js is enabled
* Get step count from url and store it in currentStep variable.
* Read the total steps from data-total-steps and add placeholder form elements to DOM for all missing steps.

Possible Scenarios:
* A) User clicks on back link
* B) User clicks on next button
* C) User clicks on browser back or forward button
* D) User clicks on a link in form navigation

---------

A) User clicks on back link
```javascript
var step = currentStep - 1;
fetchView(step);
```

B) User clicks on next button
```javascript
postData();
```

C) User clicks on browser back or forward button
```javascript
window.onpopstate = function(event) {
	if (event.state) {
		step = event.state.step;
		fetchView(step);
	}
};
```

D) User clicks on a link in form navigation
```javascript
var step = get step parameter from href of link;
fetchView(step);
```

---------

```javascript
function postData() {
	request.open('POST', 'form.getAttribute('action'), true);
	request.onload = function() {
		var response = this;
		var step = response.querySelector('form').getAttribute('data-step');
		if (step === currentStep) {
			//server has found error and returned the same step with errors in markup
			replace form with new form in response.
		} else {
			updateView(step, response);
		}
	}
}

function fetchView(step) {
	request.open('GET', 'form.php?step='+step, true);
	request.onload = function() {
		updateView(step, response);
	}
}

function updateView(step, response) {
	replace form with index of step -1 with form in response
	if (slider) {
		goToSlide(step);
	}
	currentStep = step;
}
```
