//version 0.0.3

class FormWizard {
	constructor(options) {
		this.element = options.element;
		this.forms = this.element.querySelector('.formwizard__forms');
		this.ajaxFormClass = options.ajaxFormClass;
		this.stepClass = options.stepClass;
		this.ajaxLinkClass = options.ajaxLinkClass;
		this.callbackUpdateView = options.callbackUpdateView;
		this.callbackInit = options.callbackInit;
		this.currentStep = this.getStep();
		this.stepsCount = parseInt(this.element.getAttribute('data-steps-count'));

		this.element.classList.add('js');

		this.initDOM();
		this.addEventListeners();

		window.history.replaceState({
			step: this.currentStep,
			url: location.href
		}, '', location.href);

		if (typeof this.callbackInit === 'function') {
			this.callbackInit();
		}
	}

	getStep() {
		const urlParams = new URLSearchParams(window.location.search);

		return parseInt(urlParams.get('step'));
	}

	initDOM() {
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
	}

	addEventListeners() {
		const self = this;

		self.element.addEventListener('submit', function(event) {
			if (event.target.classList.contains(self.ajaxFormClass)) {
				event.preventDefault();

				const form = event.target;
				const url = form.getAttribute('action');
				const data = new FormData(form);

				self.postData('POST', url, data);
			}
		});

		self.element.addEventListener('click', function(event) {
			if (event.target.classList.contains(self.ajaxLinkClass)) {
				event.preventDefault();

				const url = event.target.getAttribute('href');
				const step = self.getQueryString('step', url);

				self.fetchView(step, url, true);
			}
		});

		window.onpopstate = function(event) {
			if (event.state) {
				self.fetchView(event.state.step, event.state.url, false);
			}
		};
	}

	fetchView(step, url, updateHistory) {
		const self = this;
		const request = new XMLHttpRequest();

		request.responseType = 'document';
		request.open('GET', url, true);
		request.onload = function() {
			self.updateView(step, request, updateHistory);
		};
		request.send();
	}

	getQueryString( field, url ) {
		var href = url ? url : window.location.href;
		var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
		var string = reg.exec(href);
		return string ? string[1] : null;
	}

	postData(method, url, data) {
		const self = this;
		const request = new XMLHttpRequest();

		request.responseType = 'document';
		request.open(method, url, true);
		request.onload = function() {
			var request = this;

			if (request.status >= 200 && request.status < 400) {
				const step = self.getQueryString('step', request.responseURL);
				if (step === self.currentStep) {
					//server has found error and returned the same step with errors in markup
					//replace form with new form in response.
					self.updateView(step, request, false);
				} else {
					self.updateView(step, request, true);
				}
			} else {
				// We reached our target server, but it returned an error
			}
		};
		request.send(data);
	}

	updateView(step, request, updateHistory) {
		const self = this;
		const steps = self.forms.querySelectorAll('.' + self.stepClass);
		const newChild = request.response.querySelector(`.${self.stepClass}`);
		const newFormNav = request.response.querySelector('.formwizard__nav');

		self.forms.replaceChild(newChild, steps[step-1]);
		self.element.replaceChild(newFormNav, self.element.querySelector('.formwizard__nav'));

		if (typeof self.callbackUpdateView === 'function') {
			self.callbackUpdateView({
				step: step
			});
		} else {
			if (step !== self.currentStep) {
				steps[self.currentStep-1].setAttribute('hidden', 'hidden');
				steps[step-1].removeAttribute('hidden');
			}
		}

		self.currentStep = step;

		if (updateHistory) {
			window.history.pushState({
				step: step,
				url: request.responseURL
			}, '', request.responseURL);
		}
	}
}
