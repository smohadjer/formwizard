export function getQueryString(field, url) {
	var href = url ? url : window.location.href;
	var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
	var string = reg.exec(href);
	return string ? string[1] : null;
}

export function postData(url, data, callback, self) {
	const request = new XMLHttpRequest();

	request.responseType = 'document';
	request.open('POST', url, true);
	request.onload = function() {
		callback.call(self, this);
	};
	request.send(data);
}
