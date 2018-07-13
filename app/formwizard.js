class FormWizard {
	constructor(options) {
		this.element = options.element;
		this.ajaxFormClass = options.ajaxFormClass;
		this.stepClass = options.stepClass;
		this.backButtonClass = options.backButtonClass;
		this.callbackUpdateView = options.callbackUpdateView;
		this.currentStep = this.getStep();
		this.addEventListeners();

		window.history.replaceState({
			url: location.href
		}, '', location.href);
	}

	getStep() {
		const urlParams = new URLSearchParams(window.location.search);

		return parseInt(urlParams.get('step'));
	}

	addEventListeners() {
		const self = this;

		self.element.addEventListener('submit', function(event) {
			if (event.target.classList.contains(self.ajaxFormClass)) {
				event.preventDefault();

				const form = event.target;
				const url = form.getAttribute('action');
				const data = new FormData(form);

				self.ajaxSend('POST', url, data);
			}
		});

		self.element.addEventListener('click', function(event) {
			if (event.target.classList.contains(self.backButtonClass)) {
				event.preventDefault();
				window.history.go(-1);
			}
		});

		window.onpopstate = function(event) {
			if (event.state) {
				self.ajaxSend('GET', event.state.url);
			}
		};
	}

	ajaxSend(method, url, data) {
		const self = this;
		const request = new XMLHttpRequest();

		request.responseType = 'document';
		request.open(method, url, true);
		request.onload = function() {
			self.ajaxSuccess(this, method);
		};
		request.send(data);
	}

	ajaxSuccess (request, method) {
		const self = this;

		if (request.status >= 200 && request.status < 400) {
			const newForm = request.response.querySelector(`.${self.stepClass}`);
			const url = request.responseURL;

			if (newForm) {
				if (method === 'POST') {
					window.history.pushState({
						url: url
					}, '', url);
				}

				self.updateView(newForm);
			}
		} else {
			// We reached our target server, but it returned an error
		}
	}

	updateView(newForm) {
		const self = this;
		//const forms = self.element.querySelectorAll(`.${self.stepClass}`);
		//const oldForm = forms[self.currentStep - 1];
		const oldForm = self.element.querySelector(`.${self.stepClass}`);
		const newStep = self.getStep();
		const options = {
			oldForm: oldForm,
			newForm: newForm,
			oldStep: self.currentStep,
			newStep: newStep
		};

		//update page
		if (typeof self.callbackUpdateView === 'function') {
			self.callbackUpdateView(options);
		} else {
			options.oldForm.remove();
			self.element.appendChild(newForm);
		}

		self.currentStep = newStep;
	}
}
