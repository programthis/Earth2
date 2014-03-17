$(document).ready(function(){
	var interval;
	var countries = gon.newsfeed;
	var numCountries = countries.length;
	var subscribeCounter = 0;

	interval = setInterval(function(){
		var numCountries = countries.length;
		console.log(numCountries);
		var newsfeedCountry = countries[subscribeCounter].name;
		var newsfeedLatitude = countries[subscribeCounter].latitude;
		var newsfeedLongitude = countries[subscribeCounter].longitude;

		console.log(newsfeedCountry);
		subscribeCounter++;
		if (subscribeCounter === numCountries){
			subscribeCounter = 0;
		}
		populateNewsfeed(newsfeedCountry,newsfeedLatitude, newsfeedLongitude);
	},10000000);

	function populateNewsfeed(newsfeedCountry,newsfeedLatitude,newsfeedLongitude){

		$.bingSearch({
		    query: newsfeedCountry,
		    latitude: newsfeedLatitude,
		    longitude: newsfeedLongitude,

		    appKey: '7DkdEuUKwIAzix/CqNuIqXdJ1joqegBN+BmPUQ3NHZU',
		    // Optidefaults to the Bing Search API Web Results Query).
		    // Additional information: This feature allows you to proxy through a server-side
		    //                         script in order to hide your API key, which is exposed to the
		    //                         world if you set it client-side in appKey. An example PHP
		    //                         script is included (searchproxy.php).
		    // Optional (defaults to 1): Page Number
		    pageNumber: 1,
		    urlBase: 'https://api.datamarket.azure.com/Bing/Search/v1/News',
		    // Optional (defaults to 10): Page Size
		    pageSize: 1,
		    // Optional: Function is called after search results are retrieved, but before the interator is called
		    beforeSearchResults: function(data) {
		        // Use data.hasMore, data.resultBatchCount
		    },
		    // Optional: Function is called once per result in the current batch
		    searchResultIterator: function(data) {
		        // Use data.ID, data.Title, data.Description, data.Url, data.DisplayUrl, data.Metadata.Type (check for undefined)
		        console.log(data.Title);
		        console.log(data.Description);
		        console.log(data.Url);
		        var news = document.createElement("div");
		        news.setAttribute("class", "article");

		        //creating link and title for article
		        var newsItem = document.createElement("a");
		        newsItem.setAttribute("href", data.Url);
		        newsItem.setAttribute("target", "blank");
		        newsItem.innerHTML = data.Title
		        news.appendChild(newsItem);

		        $("#newsfeed").prepend(news);

		    },
		    // Optional: Function is called after search results are retrieved and after all instances of the interator are called
		    afterSearchResults: function(data) {
		        // Use data.hasMore, data.resultBatchCount
		    },
		    // Optional: Called when there is an error retrieving results
		    fail: function(data) {
		        // data contains an error message
		        console.log('bing search fail!');
		    }
		}); 

	}

});