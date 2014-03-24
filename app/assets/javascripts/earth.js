$(document).ready(function(){

  var interval = 0;
  
  var ge;
  var placemark;
  var countries;
  var capitals;

  $.ajax({
    type: "GET",
    url: "/countries",
    dataType: "json"
  }).done(function(response){
    countries = response;
  });

  $.ajax({
    type: "GET",
    url: "/capitals",
    dataType: "json"
  }).done(function(response){
    capitals = response;
  });

  //searching for breaking news in an interval of every 3 minutes
  interval = setInterval(function(){

    var numCountries = countries.length;
    var randomCountry = Math.floor((Math.random()*numCountries)+0);
    var countryName = countries[randomCountry].name;
    var breakingNewsLat = countries[randomCountry].latitude;
    var breakingNewsLong = countries[randomCountry].longitude;
    createPlacemarkForBreakingNews(countryName, breakingNewsLat,breakingNewsLong);
    
  },1800000);

    function createPlacemarkForBreakingNews(breakingNewsCountry, breakingNewsLat, breakingNewsLong){
        
        console.log("Creating placemark for breaking news...");
        console.log(breakingNewsCountry);
        console.log(breakingNewsLat);
        console.log(breakingNewsLong);

        var placemark = ge.createPlacemark('');
        ge.getFeatures().appendChild(placemark);
          
        // Create a style map.
        var styleMap = ge.createStyleMap('');

        // Create normal style for style map.
        var normalStyle = ge.createStyle('');
        var normalIcon = ge.createIcon('');
        normalIcon.setHref('http://google-maps-icons.googlecode.com/files/accident.png');
        normalStyle.getIconStyle().setIcon(normalIcon);
        normalStyle.getIconStyle().setScale(5.0);

        // Create highlight style for style map.
        var highlightStyle = ge.createStyle('');
        var highlightIcon = ge.createIcon('');
        // highlightIcon.setHref("path/to/flags.png", "-16px 0");

        highlightIcon.setHref('http://google-maps-icons.googlecode.com/files/airport.png');
        
        highlightStyle.getIconStyle().setIcon(highlightIcon);
        highlightStyle.getIconStyle().setScale(8.0);

        styleMap.setNormalStyle(normalStyle);
        styleMap.setHighlightStyle(highlightStyle);

        // Apply stylemap to a placemark.
        placemark.setStyleSelector(styleMap);

        // Create point
        var point = ge.createPoint('');

        point.setLatitude(breakingNewsLat);
        point.setLongitude(breakingNewsLong);

        point.setAltitudeMode(ge.ALTITUDE_ABSOLUTE);
        point.setAltitude(800000);
        placemark.setGeometry(point);

        google.earth.addEventListener(placemark, "click", function(event){
          //preventing the default balloon from popping up
          event.preventDefault();

          //removing the news block every time the user clicks on a new country/city
          var removingNewsFromEarth = document.getElementById("map3d");
          var elementToRemove = document.getElementById("news_block");
          if (elementToRemove){
            removingNewsFromEarth.removeChild(elementToRemove);
          }
          $.bingSearch({
              query: breakingNewsCountry,
              latitude: breakingNewsLat,
              longitude: breakingNewsLong,

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

                  $("#inner_newsfeed").hide().prepend(news).fadeIn("slow");
                  $("#newsfeed").show();

                  // feature box
                  $("<div>",{
                    id: "news_block",
                    rel: "external"
                  }).appendTo("#map3d");

                  $("<button>",{
                    id: "hide_feature_box",
                    text: "X",
                    click: function(){
                      $("#news_block").animate({height: "toggle"}, 800);
                    }
                  }).appendTo("#news_block");

                  $("<div>",{
                    id: "news_block_title",
                    rel: "external",
                    text: data.Title,
                    click: function(){
                      window.open(data.Url, "_blank");
                    }
                  }).appendTo("#news_block");


                  $("<div>",{
                    id: "news_block_description",
                    rel: "external",
                    text: data.Description,
                  }).appendTo("#news_block");

                  $("#news_block").draggable();

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
      $("#newsfeed").hide();
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
        20000000 // range (inverse of zoom)
        );
      ge.getView().setAbstractView(la);

      
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

	    google.earth.addEventListener(placemark, "click", function(event){
	    	//preventing the default balloon from popping up
	    	event.preventDefault();

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
                // news feed

                var newsItem = document.createElement("a");
                newsItem.setAttribute("href", data.Url);
                newsItem.setAttribute("target", "blank");
                newsItem.innerHTML = data.Title;
                news.appendChild(newsItem);


                var newsPath = gon.newsfeed_path;

                $("#inner_newsfeed").hide().prepend(news).fadeIn("slow");
                $("#newsfeed").show();

                // feature box
                $("<div>",{
                  id: "news_block",
                  rel: "external"
                }).appendTo("#map3d");

                $("<button>",{
                  id: "hide_feature_box",
                  text: "X",
                  click: function(){
                    $("#news_block").animate({height: "toggle"}, 800);
                  }
                }).appendTo("#news_block");

                $("<div>", {
                  id: "news_title",
                  text: data.Title
                }).appendTo("#news_block").hide().fadeIn("slow");

                $("<div>",{
                  id: "news_block_description",
                  rel: "external",
                  text: data.Description,
                  click: function(){
                    window.open(data.Url, "_blank");
                  }
                }).appendTo("#news_block").hide().fadeIn("slow");

                $("<button>",{
                  id: "country_subscribe",
                  text: "Subscribe",
                  click: function(){
                    $.ajax({
                      type: "POST",
                      url: newsPath,
                      data: {
                        "country_id": country.id
                      },
                      // contentType: "application/json",
                      dataType: "json"
                    });
                  }
                }).appendTo("#news_block");

                $("#news_block").draggable();
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

        //removing the news block every time the user clicks on a new country/city
        var removingNewsFromEarth = document.getElementById("map3d");
        var elementToRemove = document.getElementById("news_block");
        if (elementToRemove){
          removingNewsFromEarth.removeChild(elementToRemove);
        }
        
        $.bingSearch({
            query: capital.name,
            latitude: capital.latitude,
            longitude: capital.longitude,

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
                // news feed

                var newsItem = document.createElement("a");
                newsItem.setAttribute("href", data.Url);
                newsItem.setAttribute("target", "blank");
                newsItem.innerHTML = data.Title
                news.appendChild(newsItem);

                $("#inner_newsfeed").hide().prepend(news).fadeIn("slow");
                $("#newsfeed").show();

                // feature box

                $("<div>",{
                  id: "news_block",
                  rel: "external"
                }).appendTo("#map3d");

                $("<button>",{
                  id: "hide_feature_box",
                  text: "X",
                  click: function(){
                    $("#news_block").animate({height: "toggle"}, 800);
                  }
                }).prependTo("#news_block");

                $("<div>",{
                  id: "news_block_title",
                  rel: "external",
                  text: data.Title,
                  click: function(){
                    window.open(data.Url, "_blank");
                  }
                }).appendTo("#news_block");


                $("<div>",{
                  id: "news_block_description",
                  rel: "external",
                  text: data.Description,
                }).appendTo("#news_block");

                $("#news_block").draggable();

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

    function failureCB(errorCode) {
    }

    function showSky() {
      // create the placemark
      placemark = ge.createPlacemark('');
      placemark.setName("CLICK HERE FOR ALIEN NEWS");
      var point = ge.createPoint('');
      point.setLatitude(41);
      point.setLongitude(-169);
      
      // Create a style map.
      var styleMap = ge.createStyleMap('');

      // Create normal style for style map.
      var normalStyle = ge.createStyle('');
      var normalIcon = ge.createIcon('');
      normalIcon.setHref('http://m.c.lnkd.licdn.com/mpr/pub/image-5r4ffO2pmmdGmC0PH20ZRh2fvK9Qp1KuAppZCbnpvxilkLX4Ar4ZCG-kdxfQ8yy9Ch0/jenna-quint.jpg');
      normalStyle.getIconStyle().setIcon(normalIcon);
      normalStyle.getIconStyle().setScale(3.0);

      styleMap.setNormalStyle(normalStyle);

      // Apply stylemap to a placemark.
      placemark.setStyleSelector(styleMap);

      placemark.setGeometry(point);

      // add the placemark to the earth DOM
      ge.getFeatures().appendChild(placemark);

      google.earth.addEventListener(placemark, "click", function(event){
        //preventing the default balloon from popping up
        event.preventDefault();

        //removing the news block every time the user clicks on a new country/city
        var removingNewsFromEarth = document.getElementById("map3d");
        var elementToRemove = document.getElementById("news_block");
        if (elementToRemove){
          removingNewsFromEarth.removeChild(elementToRemove);
        }

        $.bingSearch({
            query: "UFO",
            latitude: 41,
            longitude: -169,

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
                // news feed

                var newsItem = document.createElement("a");
                newsItem.setAttribute("href", data.Url);
                newsItem.setAttribute("target", "blank");
                newsItem.innerHTML = data.Title
                news.appendChild(newsItem);

                $("#inner_newsfeed").hide().prepend(news).fadeIn("slow");
                $("#newsfeed").show();

                // feature box

                $("<div>",{
                  id: "news_block",
                  rel: "external"
                }).appendTo("#map3d");

                $("<button>",{
                  id: "hide_feature_box",
                  text: "X",
                  click: function(){
                    $("#news_block").animate({height: "toggle"}, 800);
                  }
                }).prependTo("#news_block");

                $("<div>",{
                  id: "news_block_title",
                  rel: "external",
                  text: data.Title,
                  click: function(){
                    window.open(data.Url, "_blank");
                  }
                }).appendTo("#news_block");


                $("<div>",{
                  id: "news_block_description",
                  rel: "external",
                  text: data.Description,
                }).appendTo("#news_block");

                $("#news_block").draggable();

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

    $("#button-show-sky").click( function(eventObject) {
      showSky();
    });

    $("#button-show-earth").click( function(eventObject) {
      showEarth();
    });

    $("#button-center").click( function(eventObject) {
      reCentre();
    })

    // $(document).ready(function(){
      $("#toggleBtn").click(function(){
        $( ".article" ).fadeToggle( "fast" );
        $("#newsfeed").animate({ width: 'toggle' 
      }, 800);
     // alert("The slideToggle() method is finished!");
  });
// });

    

});