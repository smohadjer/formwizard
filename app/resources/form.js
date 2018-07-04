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

	function ajaxSuccess () {
		const request = this;
		if (request.status >= 200 && request.status < 400) {
			const newForm = request.response.querySelector('form');
			if (newForm) {
				const oldForm = document.querySelector('.formwizard form');
				const parent = oldForm.parentNode;
				oldForm.parentNode.removeChild(oldForm);
				parent.appendChild(newForm);
			}
		} else {
			// We reached our target server, but it returned an error
		}
	}

	function ajaxSend(form) {
		const request = new XMLHttpRequest();
		request.responseType = 'document';
		request.open('POST', form.getAttribute('action'), true);
		request.onload = ajaxSuccess;
		request.send(new FormData(form));
	}

	ready(function() {
		const formWizard = document.querySelector('.formwizard');
		formWizard.addEventListener('submit', function(event) {
			if (event.target.classList.contains('ajax')) {
				event.preventDefault();
				ajaxSend(event.target);
			}
		});
	});
})();
