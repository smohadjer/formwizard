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
		const formWizard = document.querySelector('.formwizard');
		const form = formWizard.querySelector('form');
		const url = form.getAttribute('action');
		const currentUrl = 'form.php' + location.search;

		formWizard.addEventListener('submit', function(event) {
			if (event.target.classList.contains('ajax')) {
				event.preventDefault();
				ajaxSend(event.target);
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
				ajaxSendGet(event.state.url);
			}
		};

		window.history.replaceState({url: currentUrl}, '', currentUrl);
	}

	function ajaxSuccess (request, url, type) {
		if (request.status >= 200 && request.status < 400) {
			const newForm = request.response.querySelector('form');

			if (newForm) {
				updateView(newForm);

				if (type === 'post') {
					updateBrowserAddressBar(url);
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

	function ajaxSend(form) {
		const request = new XMLHttpRequest();
		const url = form.getAttribute('action');
		const data = new FormData(form);

		request.responseType = 'document';
		request.open('POST', url, true);
		request.onload = function() {
			ajaxSuccess(this, url, 'post');
		};
		request.send(data);
	}

	function ajaxSendGet(url) {
		const request = new XMLHttpRequest();

		request.responseType = 'document';
		request.open('GET', url, true);
		request.onload = function() {
			ajaxSuccess(this, url, 'get');
		};
		request.send();
	}

	function updateBrowserAddressBar(url) {
		window.history.pushState({url: url}, '', url);
	}
})();
