$(document).ready(function(){
	
	var news = gon.news;

	var titles = [];
	var urls = [];

	for (var i =0; i < news.articles.length; i++){
	    titles[i] = news.articles[i].title;
	    urls[i] = news.articles[i].url;
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