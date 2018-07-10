//version 0.0.1

class FormWizard {
	constructor() {
		this.elm = document.querySelector('.formwizard');
		this.addEventListeners();

		window.history.replaceState({url: location.href}, '', location.href);
	}

	addEventListeners() {
		const self = this;

		self.elm.addEventListener('submit', function(event) {
			if (event.target.classList.contains('ajax')) {
				event.preventDefault();

				const form = event.target;
				const url = form.getAttribute('action');
				const data = new FormData(form);

				self.ajaxSend('POST', url, data);
			}
		});

		self.elm.addEventListener('click', function(event) {
			if (event.target.classList.contains('back')) {
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
			const newForm = request.response.querySelector('form');
			const url = request.responseURL;

			if (newForm) {
				self.updateView(newForm);

				if (method === 'POST') {
					window.history.pushState({url: url}, '', url);
				}
			}
		} else {
			// We reached our target server, but it returned an error
		}
	}

	updateView(newForm) {
		const oldForm = document.querySelector('.formwizard form');
		const parent = oldForm.parentNode;

		oldForm.parentNode.removeChild(oldForm);
		parent.appendChild(newForm);
	}
}
