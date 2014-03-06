$(document).ready(function(){

	var = url 
  var = title
  for (var i=0; i< news.length; i++)
  {
    url = url[i]
  }

  var ge;
    var placemark;
    var newsSearch;

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
	
	function addSampleUIHtml(html) {
	  document.getElementById('sample-ui').innerHTML += html;
	}

    function init() {
      google.earth.createInstance('map3d', initCB, failureCB);
      addSampleButton('Look up in the sky, kid.', showSky);
      addSampleButton('Homeward Bound', showEarth);
      addSampleButton('Show Sun (Dusk/Dawn)', showSun);
      addSampleButton('Hide Sun', hideSun);
      addSampleButton('Re-Centre', reCentre);

      var countries = gon.countries;
      var cities = gon.cities;
      Search();
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
      var cities = gon.cities;
      
      countries.forEach(createPlacemarkForCountry);
      // cities.forEach(createPlacemarkForCity);
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
	    highlightIcon.setHref('http://google-maps-icons.googlecode.com/files/world.png');
	    highlightStyle.getIconStyle().setIcon(highlightIcon);
	    highlightStyle.getIconStyle().setScale(15.0);

	    styleMap.setNormalStyle(normalStyle);
	    styleMap.setHighlightStyle(highlightStyle);

	    // Apply stylemap to a placemark.
	    placemark.setStyleSelector(styleMap);


	    // Create point
	    var point = ge.createPoint('');

	    point.setLatitude(latitude);
	    point.setLongitude(longitude);
	    placemark.setGeometry(point);

	    //testing out to see if we can get Toronto to populate the news section with Toronto news
	    google.earth.addEventListener(placemark, "click", function(event){
	    	//preventing the default balloon from popping up
	    	event.preventDefault();

	    	//testing out the time
	    	//var tp = ge.getTime().getTimePrimitive();
	    	//console.log(tp.getWhen().get());

		    var options = { "format" : "300x250", 
		    "queryList" : [
		          {
		            "title" : "World News",
		            "q" : country.name
		          },
		          {
		            "q" : country.name
		          }
		        ]
		        // ,"scoring" : "tp"

				};
			var content = document.getElementById("content");
			var newsShow = new google.elements.NewsShow(content,options);

	    });

    }

    function createPlacemarkForCity(city){
    	var latitude = city.latitude;
	    var longitude = city.longitude;
	    if (latitude === null && longitude === null){
	    	return;
	    }

	    if (city.capital === "no"){
	    	return;
	    }
	    console.log(city.name);
	    console.log(city.capital);

    	var placemark = ge.createPlacemark('');
    	placemark.setName(city.name);
	    ge.getFeatures().appendChild(placemark);
	  
	    // Create style map for placemark
	    var icon = ge.createIcon('');
	    icon.setHref('http://maps.google.com/mapfiles/kml/paddle/red-circle.png');
	    var style = ge.createStyle('');
	    style.getIconStyle().setIcon(icon);
	    style.getIconStyle().setScale(3.0);
	    placemark.setStyleSelector(style);
	  
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

		    var options = { "format" : "300x250", 
		    "queryList" : [
		          {
		            "title" : "World News",
		            "q" : city.name
		          },
		          {
		            "q" : city.name
		          }
		        ]
		        // ,"scoring" : "tp"

				};
			var content = document.getElementById("content");
			var newsShow = new google.elements.NewsShow(content,options);
	    });

    }

    function failureCB(errorCode) {
    }

   var AppId = "7DkdEuUKwIAzix/CqNuIqXdJ1joqegBN+BmPUQ3NHZU";
   
   function Search()
   {
       var requestStr = "http://api.bing.net/json.aspx?"
       
           // Common request fields (required)
           + "AppId=" + AppId
           + "&Query=Kyle"
           + "&Sources=News"
           
           // Common request fields (optional)
           + "&Version=2.0"
           + "&Market=en-us"
           + "&Options=EnableHighlighting"

           // News-specific request fields (optional)
           + "&News.Offset=0"
           
           // The following request fields are mutually exclusive.
           // Uncomment the line corresponding to the request field you wish
           // to use.
           ////+ "&News.LocationOverride=US.WA"
           ////+ "&News.Category=rt_Political"
           + "&News.SortBy=Relevance"
           
           // JSON-specific request fields (optional)
           + "&JsonType=callback"
           + "&JsonCallback=SearchCompleted";

          console.log(requestStr);
        var requestScript = document.getElementById("searchCallback");
        requestScript.src = requestStr;

   }

   function SearchCompleted(response)
   {
   	   alert("I was called");
       var errors = response.SearchResponse.Errors;
       if (errors != null)
       {
           // There are errors in the response. Display error details.
           DisplayErrors(errors);
       }
       else
       {
           // There were no errors in the response. Display the
           // News results.
           DisplayResults(response);
       }
   }

   function DisplayResults(response)
   {
       var output = document.getElementById("newsfeed");
       var resultsHeader = document.createElement("h4");
       var resultsList = document.createElement("ul");
       output.appendChild(resultsHeader);
       output.appendChild(resultsList);
   
       var results = response.SearchResponse.News.Results;
       
       // Display the results header.
       resultsHeader.innerHTML = "Bing API Version "
           + response.SearchResponse.Version
           + "<br />News results for "
           + response.SearchResponse.Query.SearchTerms
           + "<br />Displaying "
           + (response.SearchResponse.News.Offset + 1)
           + " to "
           + (response.SearchResponse.News.Offset + results.length)
           + " of "
           + response.SearchResponse.News.Total
           + " results<br />";
       
       // Display the News results.
       var resultsListItem = null;
       var resultStr = "";
       for (var i = 0; i < results.length; ++i)
       {
           resultsListItem = document.createElement("li");
           resultsList.appendChild(resultsListItem);
           resultStr = "<a href=\""
               + results[i].Url
               + "\">"
               + results[i].Title
               + "</a><br />"
               + results[i].Source
               + "<br />"
               + results[i].Date
               + "<br />"
               + results[i].Snippet
               + "<br /><br />";
           console.log(resultStr);
           // Replace highlighting characters with strong tags.
           resultsListItem.innerHTML = ReplaceHighlightingCharacters(
               resultStr,
               "<strong>",
               "</strong>");
       }
   }
   
   function ReplaceHighlightingCharacters(text, beginStr, endStr)
   {
       // Replace all occurrences of U+E000 (begin highlighting) with
       // beginStr. Replace all occurrences of U+E001 (end highlighting)
       // with endStr.
       var regexBegin = new RegExp("\uE000", "g");
       var regexEnd = new RegExp("\uE001", "g");
             
       return text.replace(regexBegin, beginStr).replace(regexEnd, endStr);
   }

   function DisplayErrors(errors)
   {
       var output = document.getElementById("newsfeed");
       var errorsHeader = document.createElement("h4");
       var errorsList = document.createElement("ul");
       output.appendChild(errorsHeader);
       output.appendChild(errorsList);
       
       // Iterate over the list of errors and display error details.
       errorsHeader.innerHTML = "Errors:";
       var errorsListItem = null;
       for (var i = 0; i < errors.length; ++i)
       {
           errorsListItem = document.createElement("li");
           errorsList.appendChild(errorsListItem);
           errorsListItem.innerHTML = "";
           for (var errorDetail in errors[i])
           {
               errorsListItem.innerHTML += errorDetail
                   + ": "
                   + errors[i][errorDetail]
                   + "<br />";
           }
           
           errorsListItem.innerHTML += "<br />";
       }
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

});