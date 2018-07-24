export function slide(options) {
	const slider = this.forms;
	const width = slider.offsetWidth;
	const left = 0 - width * (options.step-1);

	slider.style.left = left + 'px';
}

export function init() {
	const self = this;

	//insert a placeholder for each step of the form into DOM
	for (let i = 1; i <= self.stepsCount; i++) {
		const placeholder = document.createElement('form');
		placeholder.setAttribute('class', 'formwizard__step');
		placeholder.setAttribute('hidden', 'hidden');

		if (i !== self.currentStep) {
			if (i < self.currentStep) {
				self.forms.insertBefore(placeholder, self.forms.firstChild);
			} else {
				self.forms.appendChild(placeholder);
			}
		}
	}
	
	self.element.querySelectorAll('.formwizard__step').forEach(function(element) {
		element.removeAttribute('hidden');
	});

	if (self.currentStep !== 1) {
		slide.call(self, {
			step: self.currentStep
		});
	}

	window.addEventListener('resize', function(event) {
		slide.call(self, {
			step: self.getStep()
		});
	});
};
