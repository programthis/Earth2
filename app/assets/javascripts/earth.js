$(document).ready(function(){

  // var news = gon.news;

  // var titles = [];
  // var urls = [];

  // for (var i =0; i < news.articles.length; i++){
  //     titles[i] = news.articles[i].title;
  //     urls[i] = news.articles[i].url;
  // }

  //searching for breaking news in an interval of 3 minutes
  var interval = 0;
  var breakingNewsLat = 0;
  var breakingNewsLong = 0;
  // interval = setInterval(function(){

  //   breakingNewsLat = 90 + (-90 - 90) * Math.random();
  //   breakingNewsLong = 180 + (-180 - 180) * Math.random();

  //   var geocoder;
  //   initializeGeo();
  //   codeLatLng();

  //   function initializeGeo(){
  //     geocoder = new google.maps.Geocoder();
  //   }

  //   function codeLatLng(){
  //     var latlng = new google.maps.LatLng(breakingNewsLat, breakingNewsLong);
  //     geocoder.geocode({
  //       "latLng": latlng
  //     }, function(results){
  //       console.log(results);
  //     });
  //   }


  //   console.log(breakingNewsLat);
  //   console.log(breakingNewsLong);

  //   $.bingSearch({
  //       query: " ",
  //       latitude: breakingNewsLat,
  //       longitude: breakingNewsLong,
  //       appKey: '7DkdEuUKwIAzix/CqNuIqXdJ1joqegBN+BmPUQ3NHZU',
  //       // Optidefaults to the Bing Search API Web Results Query).
  //       // Additional information: This feature allows you to proxy through a server-side
  //       //                         script in order to hide your API key, which is exposed to the
  //       //                         world if you set it client-side in appKey. An example PHP
  //       //                         script is included (searchproxy.php).
  //       // Optional (defaults to 1): Page Number
  //       pageNumber: 1,
  //       urlBase: 'https://api.datamarket.azure.com/Bing/Search/v1/News',
  //       // Optional (defaults to 10): Page Size
  //       pageSize: 1,
  //       // Optional: Function is called after search results are retrieved, but before the interator is called
  //       beforeSearchResults: function(data) {
  //           // Use data.hasMore, data.resultBatchCount
  //       },
  //       // Optional: Function is called once per result in the current batch
  //       searchResultIterator: function(data) {
  //           // Use data.ID, data.Title, data.Description, data.Url, data.DisplayUrl, data.Metadata.Type (check for undefined)
  //           console.log(data.Title);
  //           console.log(data.Description);
  //           console.log(data.Url);
  //           var news = document.createElement("div");
  //           news.setAttribute("class", "article");

  //           // //creating link and title for article
  //           // var newsItem = document.createElement("a");
  //           // newsItem.setAttribute("href", data.Url);
  //           // newsItem.setAttribute("target", "blank");
  //           // newsItem.innerHTML = data.Title

  //           // //creating description for article
  //           // var newsDescription = document.createElement("p");
  //           // newsDescription.innerHTML = data.Description;
  //           // news.appendChild(newsItem);
  //           // news.appendChild(newsDescription);

            

  //       },
  //       // Optional: Function is called after search results are retrieved and after all instances of the interator are called
  //       afterSearchResults: function(data) {
  //           // Use data.hasMore, data.resultBatchCount
  //       },
  //       // Optional: Called when there is an error retrieving results
  //       fail: function(data) {
  //           // data contains an error message
  //           console.log('bing search fail!');
  //       }
  //   });
  // },3000);
  
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

  // setInterval(function(){urlFunction}, 300000);

 setTimeout(urlFunction, 300);

  var ge;
  var placemark;

	function addSampleButton(caption, clickHandler) {
	  var btn = document.createElement('input');
	  btn.type = 'button';
	  btn.value = caption;
	  
	  if (btn.attachEvent)
	    btn.attachEvent('onclick', clickHandler);
	  else
	    btn.addEventListener('click', clickHandler, false);

	  // add the button to the Sample UI
	  document.getElementById('sample-ui').appendChild(btn);
	}
	
    function init() {
      google.earth.createInstance('map3d', initCB, failureCB);
      addSampleButton('Look up in the sky, kid.', showSky);
      addSampleButton('Homeward Bound', showEarth);
      addSampleButton('Show Sun (Dusk/Dawn)', showSun);
      addSampleButton('Hide Sun', hideSun);
      addSampleButton('Re-Centre', reCentre);

      var countries = gon.countries;
      var capitals = gon.capitals;
    }

    function initCB(instance) {
      ge = instance;
      ge.getWindow().setVisibility(true);
      
      // add a navigation control
      ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

      // add some layers
      ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
      //ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);
      //ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, true);
      //adding terrain layer
      // var layerRoot = ge.getLayerRoot();
      // var terrainLayer = layerRoot.getLayerById(ge.LAYER_TERRAIN);
      // terrainLayer.setVisibility(true);


      //making it so the earth look at the "non-western" side of the world upon load
      var la = ge.createLookAt('');
      la.set(48, 31,
        0, // altitude
        ge.ALTITUDE_RELATIVE_TO_GROUND,
        0, // heading
        0, // straight-down tilt
        8000000 // range (inverse of zoom)
        );
      ge.getView().setAbstractView(la);

      //creating the placemark for every country in the world
      var countries = gon.countries;
      var capitals = gon.capitals;
      
      countries.forEach(createPlacemarkForCountry);
      capitals.forEach(createPlacemarkForCapital);
    }

    function createPlacemarkForCountry(country){
    	var latitude = country.latitude;
	    var longitude = country.longitude;
	    if (latitude === null && longitude === null){
	    	return;
	    }

    	var placemark = ge.createPlacemark('');
    	placemark.setName(country.name);
	    ge.getFeatures().appendChild(placemark);
	  	  
	    // Create a style map.
	    var styleMap = ge.createStyleMap('');

	    // Create normal style for style map.
	    var normalStyle = ge.createStyle('');
	    var normalIcon = ge.createIcon('');
	    normalIcon.setHref('http://maps.google.com/mapfiles/kml/shapes/triangle.png');
	    normalStyle.getIconStyle().setIcon(normalIcon);
	    normalStyle.getIconStyle().setScale(5.0);

	    // Create highlight style for style map.
	    var highlightStyle = ge.createStyle('');
	    var highlightIcon = ge.createIcon('');
      // highlightIcon.setHref("path/to/flags.png", "-16px 0");

	    highlightIcon.setHref('http://google-maps-icons.googlecode.com/files/world.png');
      
	    highlightStyle.getIconStyle().setIcon(highlightIcon);
	    highlightStyle.getIconStyle().setScale(8.0);

	    styleMap.setNormalStyle(normalStyle);
	    styleMap.setHighlightStyle(highlightStyle);

	    // Apply stylemap to a placemark.
	    placemark.setStyleSelector(styleMap);

	    // Create point
	    var point = ge.createPoint('');

	    point.setLatitude(latitude);
	    point.setLongitude(longitude);
	    placemark.setGeometry(point);



      // google.earth.addEventListener(placemark, "mouseover", function(event){
      //   // placemark.setAttribute("class", "flag flag-cz");
      //   // placemark.setAttribute("alt", "Czech Republic");
      //   console.log(placemark);
      //   placemark.setStyleSelector
      //   placemark.css("background", "url(flags.png)");
      //   placemark.css("background-position", "-16px 0");
      //   // placemark.css("background", "blank.gif");
      //   // placemark.setAttribute("src", "blank.gif");
        
      // });




      // google.earth.addEventListener(placemark, "mouseover", function(event){
      //   //preventing the default balloon from popping up
      //   event.preventDefault();
      //   $.ajax({
      //     url: "http://www.panoramio.com/map/get_panoramas.php?",
      //     type: "GET",
      //     data: { 
      //       set: "public",
      //       from: 0,
      //       to: 1,
      //       minx: country.longitude - 1,
      //       miny: country.latitude - 1,
      //       maxx: country.longitude + 1,
      //       maxy: country.latitude + 1,
      //       size: "medium",
      //       mapfilter: true
      //     },
      //     dataType: "jsonp",
      //     success: function(response){
      //       console.log("heeeey");
      //       console.log(response);

      //       var highlightStyle = ge.createStyle('');
      //       var highlightIcon = ge.createIcon('');
      //       highlightIcon.setHref(response.photos[0].photo_file_url);
      //       highlightStyle.getIconStyle().setIcon(highlightIcon);
      //       highlightStyle.getIconStyle().setScale(10.0);
      //       styleMap.setHighlightStyle(highlightStyle);
      //     }
      //   })

      // });

	    //testing out to see if we can get Toronto to populate the news section with Toronto news
	    google.earth.addEventListener(placemark, "click", function(event){
	    	//preventing the default balloon from popping up
	    	event.preventDefault();

	    	//testing out the time
	    	//var tp = ge.getTime().getTimePrimitive();
	    	//console.log(tp.getWhen().get());


        //changing the altitude of the placemark when it is clicked
        point.setAltitudeMode(ge.ALTITUDE_ABSOLUTE);
        point.setAltitude(800000);
        placemark.setGeometry(point);



        //removing the news block every time the user clicks on a new country/city
        var removingNewsFromEarth = document.getElementById("map3d");
        var elementToRemove = document.getElementById("news_block");
        if (elementToRemove){
          removingNewsFromEarth.removeChild(elementToRemove);
        }
        
        $.bingSearch({
            query: country.name,
            latitude: country.latitude,
            longitude: country.longitude,

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

                //creating description for article
                var newsDescription = document.createElement("p");
                newsDescription.innerHTML = data.Description;
                news.appendChild(newsItem);
                news.appendChild(newsDescription);

                $("#newsfeed").prepend(news);

                $("<div>",{
                  id: "news_block",
                  rel: "external",
                  text: data.Title,
                  click: function(){
                    window.open(data.Url, "_blank");
                  }
                }).appendTo("#map3d");

                $("<div>",{
                  id: "news_block_description",
                  rel: "external",
                  text: data.Description,
                  click: function(){
                    window.open(data.Url, "_blank");
                  }
                }).appendTo("#news_block");

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
	    });

    }

    function createPlacemarkForCapital(capital){
    	var latitude = capital.latitude;
	    var longitude = capital.longitude;
	    if (latitude === null && longitude === null){
	    	return;
	    }

    	var placemark = ge.createPlacemark('');
    	placemark.setName(capital.name);
	    ge.getFeatures().appendChild(placemark);
	  
      // Create a style map.
      var styleMap = ge.createStyleMap('');

      // Create normal style for style map.
      var normalStyle = ge.createStyle('');
      var normalIcon = ge.createIcon('');
      normalIcon.setHref('http://maps.google.com/mapfiles/kml/shapes/placemark_circle_highlight.png');
      normalStyle.getIconStyle().setIcon(normalIcon);
      normalStyle.getIconStyle().setScale(3.0);

      // Create highlight style for style map.
      var highlightStyle = ge.createStyle('');
      var highlightIcon = ge.createIcon('');
      // highlightIcon.setHref("path/to/flags.png")
      highlightIcon.setHref('http://google-maps-icons.googlecode.com/files/apartment.png');
      
      highlightStyle.getIconStyle().setIcon(highlightIcon);
      highlightStyle.getIconStyle().setScale(5.0);

      styleMap.setNormalStyle(normalStyle);
      styleMap.setHighlightStyle(highlightStyle);

      // Apply stylemap to a placemark.
      placemark.setStyleSelector(styleMap);


	    // Create point
	    var point = ge.createPoint('');

	    point.setLatitude(latitude);
	    point.setLongitude(longitude);
	    placemark.setGeometry(point);

	    google.earth.addEventListener(placemark, "click", function(event){
	    	//preventing the default balloon from popping up
	    	event.preventDefault();

	    	//testing out the time
	    	//var tp = ge.getTime().getTimePrimitive();
	    	//console.log(tp.getWhen().get());

	    });
    }

    function failureCB(errorCode) {
    }

    function showSky() {
    	// create the placemark
    	placemark = ge.createPlacemark('');
    	placemark.setName("CLICK HERE FOR ALIEN NEWS");
    	var point = ge.createPoint('');
    	point.setLatitude(41);
    	point.setLongitude(-169);
    	placemark.setGeometry(point);

    	// add the placemark to the earth DOM
    	ge.getFeatures().appendChild(placemark);


      google.earth.addEventListener(placemark, "click", function(event){
      	//preventing the default balloon from popping up
      	event.preventDefault();

  	    var options = { "format" : "300x250", 
  	    "queryList" : [
  	          {
  	            "title" : "OUTER SPACE",
  	            "q" : "Andromeda Galaxy"
  	          },
  	          {
  	            "q" : "Nasa"
  	          }
  	        ]
  			};
  		var content = document.getElementById("content");
  		var newsShow = new google.elements.NewsShow(content,options);

      });


      ge.getOptions().setMapType(ge.MAP_TYPE_SKY);

      setTimeout(function() {
        // Zoom in on a nebula.
        var oldFlyToSpeed = ge.getOptions().getFlyToSpeed();
        ge.getOptions().setFlyToSpeed(.2);  // Slow down the camera flyTo speed.
        var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
        lookAt.set(41.28509187215, -169.2448684551622, 0,
                   ge.ALTITUDE_RELATIVE_TO_GROUND, 262.87, 0, 162401);
        // Also try:
        //   lookAt.set(-59.65189337195337, -18.799770300376053, 0,
        //              ge.ALTITUDE_RELATIVE_TO_GROUND, 0, 0, 36817);
        ge.getView().setAbstractView(lookAt);
        ge.getOptions().setFlyToSpeed(oldFlyToSpeed);
      }, 1000);  // Start the zoom-in after one second.
    }

    function showEarth() {
      ge.getOptions().setMapType(ge.MAP_TYPE_EARTH);
    }

    function showSun() {
      ge.getSun().setVisibility(true);
    }

    function hideSun() {
      ge.getSun().setVisibility(false);
    }
    function reCentre() {
      //making it so the earth look at the "non-western" side of the world upon load
      var la = ge.createLookAt('');
      la.set(48, 31,
        0, // altitude
        ge.ALTITUDE_RELATIVE_TO_GROUND,
        0, // heading
        0, // straight-down tilt
        8000000 // range (inverse of zoom)
        );
      ge.getView().setAbstractView(la);
    }

    google.setOnLoadCallback(init);

// news feed:

      $(".toggleBtn").click(function(){
      $("#newsfeed").animate({ width: 'toggle' }, 800);
        // alert("The slideToggle() method is finished!");
      });



});