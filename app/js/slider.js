const slider = {};

slider.init = function() {
	'use strict';

	const self = this;

	slider.element = self.element.querySelector('.formwizard__forms');

	self.element.querySelectorAll('.formwizard__step').forEach(function(element) {
		element.removeAttribute('hidden');
	});

	if (self.currentStep !== 1) {
		slider.slide.call(self, {
			step: self.currentStep
		});
	}

	window.addEventListener('resize', function(event) {
		slider.slide.call(self, {
			step: self.getStep()
		});
	});
};

slider.slide = function(options) {
	'use strict';

	const width = slider.element.offsetWidth;
	const left = 0 - width * (options.step-1);

	slider.element.style.left = left + 'px';
};
