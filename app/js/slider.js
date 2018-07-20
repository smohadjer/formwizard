const slider = {};

slider.init = function() {
	'use strict';
	
	this.element.querySelectorAll('.formwizard__step').forEach(function(elm) {
		elm.removeAttribute('hidden');
	});

	if (this.currentStep !== 1) {
		slider.slide.call(this, {
			step: this.currentStep
		});
	}
};

slider.slide = function(options) {
	'use strict';

	const slider = this.element.querySelector('.formwizard__forms');
	const width = slider.offsetWidth;
	const left = 0 - width * (options.step-1);

	slider.style.left = left + 'px';
};
