export function getQueryString(field, url) {
	var href = url ? url : window.location.href;
	var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
	var string = reg.exec(href);
	return string ? string[1] : null;
}

export function slide(options) {
	const slider = this.forms;
	const width = slider.offsetWidth;
	const left = 0 - width * (options.step-1);

	slider.style.left = left + 'px';
}

export function init() {
	const self = this;

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
