const slider = function(options) {
	'use strict';

	const oldForm = options.oldForm;
	const newForm = options.newForm;
	const direction = (options.oldStep < options.newStep) ? 'forward' : 'backward';
	const slider = this.element.querySelector('.formwizard__forms');
	const diff = options.newStep - options.oldStep;

	slider.addEventListener('transitionend', removeOldForm);

	function removeOldForm() {
		console.log(options.oldStep, oldForm);
		//oldForm.remove();
		slider.removeEventListener('transitionend', removeOldForm);
	}

	let parentPosLeft = slider.parentNode.offsetLeft;
	let left = slider.offsetLeft - parentPosLeft;
	let width = slider.offsetWidth;

	if (direction === 'forward') {
		//oldForm.classList.add('outLeft');
		//newForm.classList.add('outRight');

		// if newForm does't exist in page append it otherwise update it
		slider.appendChild(newForm);

		// triggering reflow otherwise removing class won't trigger animation
		//void newForm.offsetWidth;


		left = left - width;

		//newForm.classList.remove('outRight');
		//slider.classList.add('outLeft');

		console.log(left, width);

		//left = parseInt(left) - width;

		slider.style.left = left + 'px';

		/*
		window.setTimeout(function() {
			newForm.classList.remove('outRight');
		}, 10);
		*/
	} else {
		//oldForm.classList.add('outRight');
		//newForm.classList.add('outLeft');

		// if newForm does't exist in page append it otherwise update it
		slider.appendChild(newForm);

		left = left + width;

		slider.style.left = left + 'px';


		// triggering reflow otherwise removing class won't trigger animation
		//void newForm.offsetWidth;

		//newForm.classList.remove('outLeft');
		//slider.classList.remove('outLeft');

		/*
		window.setTimeout(function() {
			newForm.classList.remove('outLeft');
		}, 10);
		*/
	}
};
