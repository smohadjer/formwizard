//version 0.0.5

import {getQueryString, postData} from './modules/utilities.js';

export default class FormWizard {
	constructor(options) {
		this.element = options.element;
		this.callback = options.callback;

		//selectors
		this.ajaxFormClass = 'fromwizard__ajaxForm';
		this.ajaxLinkClass = 'fromwizard__ajaxLink';
		this.stepSelector = '.formwizard__step';
		this.navSelector = '.formwizard__nav';

		this.forms = this.element.querySelector('.formwizard__forms');

		this.currentStep = this.getStep();

		this.element.classList.add('js');

		this.addEventListeners();

		window.history.replaceState({
			step: this.currentStep,
			url: location.href
		}, '', location.href);
	}

	getStep() {
		const urlParams = new URLSearchParams(window.location.search);
		return parseFloat(urlParams.get('step'));
	}

	addEventListeners() {
		const self = this;

		self.element.addEventListener('submit', function(event) {
			if (event.target.classList.contains(self.ajaxFormClass)) {
				event.preventDefault();

				const form = event.target;
				const url = form.getAttribute('action');
				const data = new FormData(form);

				postData(url, data, self.postCallback, self);
			}
		});

		self.element.addEventListener('click', function(event) {
			if (event.target.classList.contains(self.ajaxLinkClass)) {
				event.preventDefault();

				const url = event.target.getAttribute('href');
				const step = getQueryString('step', url);

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

	postCallback(request) {
		const self = this;

		if (request.status >= 200 && request.status < 400) {
			const step = getQueryString('step', request.responseURL);
			let updateHistory = true;

			//this can happen if sever finds validation error and returns the same page again
			if (request.responseURL === window.location.href) {
				updateHistory = false;
			}

			self.updateView(step, request, updateHistory);
		} else {
			console.warn('Request failed with status: ', request.status);
		}
	}

	updateView(step, request, updateHistory) {
		const self = this;
		const oldForm = self.forms.querySelector(self.stepSelector);
		const newForm = request.response.querySelector(self.stepSelector);
		const newNav = request.response.querySelector(self.navSelector);
		const oldNav = self.element.querySelector(self.navSelector);
		const newTitle = request.response.querySelector('title');

		//update page title
		if (newTitle) {
			document.querySelector('title').textContent = newTitle.textContent;
		}

		//update navigation
		if (newNav) {
			self.element.replaceChild(newNav, oldNav);
		}

		if (typeof self.callback === 'function') {
			self.callback({
				step: step,
				newForm: newForm,
				oldForm: oldForm
			});
		} else {
			self.forms.replaceChild(newForm, oldForm);
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
