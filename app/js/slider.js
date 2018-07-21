const slider = {};

slider.init = function() {
	'use strict';

	const self = this;

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

	const slider = this.forms;
	const width = slider.offsetWidth;
	const left = 0 - width * (options.step-1);

	slider.style.left = left + 'px';
};
