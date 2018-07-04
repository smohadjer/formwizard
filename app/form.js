(function() {
	'use strict';

	//Helper classes to HTML for styling of nojs version
	const html = document.querySelector('html');
	html.classList.remove('no-js');
	html.classList.add('js');

	//taken from http://youmightnotneedjquery.com/
	function ready(fn) {
		if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}

	ready(function() {
		console.log('DOM is ready...');
	});
})();
