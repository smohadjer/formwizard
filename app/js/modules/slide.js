export function slide(options) {
	const self = this;
	const step = options.step;
	const newForm = options.newForm;
	const oldForm = options.oldForm;
	const slider = self.forms;
	const width = slider.offsetWidth;

	let left = 0;

	if (step < self.currentStep) {
		//add new form before current form
		slider.insertBefore(newForm, oldForm);
		slider.classList.add('noTransition');
		left = -width;
		slider.style.left = left + 'px';
		let tmp = slider.offsetWidth; //force repaint
		slider.classList.remove('noTransition');
		slider.style.left = 0 + 'px';
	} else if (step === self.currentStep) {
		slider.replaceChild(newForm, oldForm);
	} else {
		//add new form after current form
		slider.appendChild(newForm);
		left = -width;
		slider.style.left = left + 'px';
	}

	slider.addEventListener('transitionend', function(event) {
		slider.classList.add('noTransition');
		let tmp = slider.offsetWidth; //force repaint
		oldForm.remove();
		slider.style.left = 0;
		tmp = slider.offsetWidth; //force repaint
		slider.classList.remove('noTransition');
	});
}
