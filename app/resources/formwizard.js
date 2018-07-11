/*
 * @name          formwizard.js
 * @version       0.0.2
 * @author        Saeid Mohadjer
 * @repo		  https://github.com/smohadjer/formwizard
 *
 * Licensed under the MIT License
 */

class FormWizard {
	constructor(options) {
		this.element = options.element;
		this.ajaxFormClass = options.ajaxFormClass;
		this.stepClass = options.stepClass;
		this.backButtonClass = options.backButtonClass;

		this.addEventListeners();
		window.history.replaceState({
			url: location.href
		}, '', location.href);
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
				self.updateView(newForm);

				if (method === 'POST') {
					window.history.pushState({
						url: url
					}, '', url);
				}
			}
		} else {
			// We reached our target server, but it returned an error
		}
	}

	updateView(newForm) {
		const self = this;
		const oldForm = document.querySelector(`.${self.stepClass}`);
		const parent = oldForm.parentNode;

		oldForm.parentNode.removeChild(oldForm);
		parent.appendChild(newForm);
	}
}
