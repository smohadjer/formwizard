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

			console.log(newForm.innerHTML);

			if (newForm) {
				updateView(newForm);
				updateBrowserAddressBar(url, newForm);
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

		for(var pair of data.entries()) {
			console.log(pair[0]+ ', '+ pair[1]);
		}

		request.responseType = 'document';
		request.open('POST', url, true);
		request.onload = function() {
			ajaxSuccess(this, url);
		}
		request.send(data);
	}

	function updateBrowserAddressBar(url, markup) {
		console.log(markup);
		window.history.pushState({
			url: url,
			view: markup.outerHTML
		}, '', url);
	}

	ready(function() {
		const formWizard = document.querySelector('.formwizard');
		const form = formWizard.querySelector('form');
		const url = form.getAttribute('action');

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
				console.log(event.state);
				//update page
				var wrapper= document.createElement('div');
				wrapper.innerHTML= event.state.view;
				const newForm = wrapper.firstChild;

				updateView(newForm);
			}
		};

		updateBrowserAddressBar('form.php?step=1', form);
	});
})();
