Formwizard workflow

User comes to form.php?step=2 and javascript is enabled. Possible scenarios are:

* A) User clicks on back link
* B) User clicks on next button
* C) User clicks on browser back or forward button
* D) User clicks on a link in form navigation

```javascript
init() {
	this.currentStep = get value of step query in url;
	this.stepsCount =  this.element.getAttribute('data-steps-count');

	//Add placeholder for each step to the dom
	let placeholder = '<form class="formwizard__step"></form>';
	for (let i = 1; i <= this.stepsCount; i++) {
		if (i !== this.currentStep) {
			if (i < this.currentStep) {
				this.element.prepend(placeholder);
			} else {
				this.element.append(placeholder);
			}
		}
	}
}
```

A) User clicks on back link
```javascript
var step = currentStep - 1;
fetchView(step, true);
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
		fetchView(step, false);
	}
};
```

D) User clicks on a link in form navigation
```javascript
var step = get step parameter from href of link;
fetchView(step, true);
```

---------

```javascript
function postData() {
	request.open('POST', 'form.getAttribute("action")', true);
	request.onload = function() {
		var request = this;
		get step from request.responseURL;
		if (step === currentStep) {
			//server has found error and returned the same step with errors in markup
			replace form with new form in response.
		} else {
			updateView(step, request.response, true);
		}
	}
}

function fetchView(step, updateHistory) {
	request.open('GET', 'form.php?step='+step, true);
	request.onload = function() {
		var request = this;
		updateView(step, request.response, updateHistory);
	}
}

function updateView(step, response, updateHistory) {
	replace form with index of currentstep-1 with form in response
	remove class "current-step" from all forms and put it on current form
	if (slider) {
		goToSlide(step);
	}
	currentStep = step;
	if (updateHistory) {
	    history.pushState();
	}
}
```
