(function() {
	'use strict';

	const html = document.querySelector('html');

	html.classList.add('js');

	function ready(fn) {
		if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}

	ready(init);

	function init() {
		addEventListeners();

		window.history.replaceState({url: location.href}, '', location.href);
	}

	function addEventListeners() {
		const formWizard = document.querySelector('.formwizard');
		const form = formWizard.querySelector('form.ajax');
		const url = form.getAttribute('action');

		formWizard.addEventListener('submit', function(event) {
			if (event.target.classList.contains('ajax')) {
				event.preventDefault();

				const form = event.target;
				const url = event.target.getAttribute('action');
				const data = new FormData(form);

				ajaxSend('POST', url, data);
			}
		});

		formWizard.addEventListener('click', function(event) {
			if (event.target.classList.contains('back')) {
				event.preventDefault();
				window.history.go(-1);
			}
		});

		window.onpopstate = function(event) {
			if (event.state) {
				ajaxSend('GET', event.state.url);
			}
		};
	}

	function ajaxSend(method, url, data) {
		const request = new XMLHttpRequest();

		request.responseType = 'document';
		request.open(method, url, true);
		request.onload = function() {
			ajaxSuccess(this, method);
		};
		request.send(data);
	}

	function ajaxSuccess (request, method) {
		if (request.status >= 200 && request.status < 400) {
			const newForm = request.response.querySelector('form');
			const url = request.responseURL;

			if (newForm) {
				updateView(newForm);

				if (method === 'POST') {
					window.history.pushState({url: url}, '', url);
				}
			}
		} else {
			// We reached our target server, but it returned an error
		}
	}

	function updateView(newForm) {
		const oldForm = document.querySelector('.formwizard form');
		const parent = oldForm.parentNode;

		oldForm.parentNode.removeChild(oldForm);
		parent.appendChild(newForm);
	}
})();
