$(document).ready(function(){
	
	var articles = gon.news;

	var titles = [];
	var urls = [];

	for (var i = 0; i < articles.length; i++){
	    titles[i] = articles[i].webTitle;
	    urls[i] = articles[i].webUrl;
	}

	function urlFunction(){
	  var a;
	  var node;
	  for (var i =0; i < titles.length; i++){
	    a = document.createElement("a");
	    node=document.createTextNode(titles[i]);
	    a.setAttribute("href", urls[i]);
	    a.setAttribute("target", "blank");
	    a.innerHTML = titles[i] + "    ";
	    document.getElementById('ticker').appendChild(a);
	  }
	}
	setInterval(urlFunction(), 180000);
});