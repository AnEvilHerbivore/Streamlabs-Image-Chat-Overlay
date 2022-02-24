function testImage(url, callback, timeout) {
    timeout = timeout || 5000;
    var timedOut = false, timer;
    var img = new Image();
    img.onerror = img.onabort = function() {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, "error");
        }
    };
    img.onload = function() {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, "success");
        }
    };
    img.src = url;
    timer = setTimeout(function() {
        timedOut = true;
        callback(url, "timeout");
    }, timeout); 
}

// Please use event listeners to run functions.
document.addEventListener('onLoad', function(obj) {
	// obj will be empty for chat widget
	// this will fire only once when the widget loads
});

document.addEventListener('onEventReceived', function(obj) {
  	// obj will contain information about the event
	console.log(obj)
	if (obj.detail.userType == "mod" || obj.detail.owner == true) {

    testImage(obj.detail.body, function (url, result) {
        if (result == "success") {
            var element = document.getElementById("log");
            var imageElement = document.createElement('div')
            imageElement.innerHTML = `<span class="meta" style="color: ${obj.detail.tags.color}">
            <span class="badges">
            </span>
            <span class="name">${obj.detail.tags['display-name']}</span>
          </span>
        
          <span class="message">
            <img style="max-width: 400px; max-height: 800px;" src="${url}"></img>
          </span>`;
            element.appendChild(imageElement);
        }
    });
}
});
