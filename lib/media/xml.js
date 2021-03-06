/**
 * Registers the XML media type handling
 */
var Media = require("../media").Media;
function loadUrl(url){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, false);
	xhr.send();
	return xhr.responseText;
}

// load the libraries we will use
eval(loadUrl("http://goessner.net/download/prj/jsonxml/json2xml.js"));
eval(loadUrl("http://goessner.net/download/prj/jsonxml/xml2json.js"));

Media({
	mediaType:"text/xml",
	getQuality: function(object){
		return 0.4;
	},
	serialize: function(object, request, response){
		return [json2xml(object)];
	},
	deserialize: function(inputStream, request){
		// TODO: how to parseXml across platforms?
		return xml2json(parseXml(inputStream.read().decodeToString("UTF-8")));
	}
});