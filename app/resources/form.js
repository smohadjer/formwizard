(function() {
	'use strict';

	const html = document.querySelector('html');
	html.classList.remove('no-js');
	html.classList.add('js');

	function ready(fn) {
		if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}

	function ajaxSuccess (request, url) {
		if (request.status >= 200 && request.status < 400) {
			const newForm = request.response.querySelector('form');
			if (newForm) {
				const oldForm = document.querySelector('.formwizard form');
				const parent = oldForm.parentNode;
				oldForm.parentNode.removeChild(oldForm);
				parent.appendChild(newForm);

				updateBrowserAddressBar(url);
			}
		} else {
			// We reached our target server, but it returned an error
		}
	}

	function ajaxSend(form) {
		const request = new XMLHttpRequest();
		const url = form.getAttribute('action');

		request.responseType = 'document';
		request.open('POST', url, true);
		request.onload = function() {
			ajaxSuccess(this, url);
		}
		request.send(new FormData(form));
	}

	function updateBrowserAddressBar(url) {
		window.history.pushState({}, '', url);
	}

	ready(function() {
		const formWizard = document.querySelector('.formwizard');
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
			console.log("location: " + document.location);
		};
	});
})();
