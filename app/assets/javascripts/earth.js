$(document).ready(function(){

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

      var countries = gon.countries;
      var cities = gon.cities;
      var options = [];

      //setting the query for all the countries in the world
      function setCountryOption(country, index){
      	options[index] = { "format" : "300x250", 
      "queryList" : [
            {
              "title" : "World News",
              "q" : countries[index].name
            },
            {
              "q" : countries[index].name
            }
          ]
  		};
      }	
      countries.forEach(setCountryOption);

      //setting the query for all the countries in the world
      function setCityOption(city, index){
      	options[index] = { "format" : "300x250", 
      "queryList" : [
            {
              "title" : "World News",
              "q" : cities[index].name
            },
            {
              "q" : cities[index].name
            }
          ]
  		};
      }	
      cities.forEach(setCityOption);

      var content = document.getElementById("content");
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
      // var cities = gon.cities;
      
      countries.forEach(createPlacemarkForCountry);
      cities.forEach(createPlacemarkForCity);

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
	  
	    // Create style map for placemark
	    // var icon = ge.createIcon('');
	    // icon.setHref('http://maps.google.com/mapfiles/kml/shapes/triangle.png');
	    // var style = ge.createStyle('');
	    // style.getIconStyle().setIcon(icon);
	    // style.getIconStyle().setScale(5.0);

	    // placemark.setStyleSelector(style);
	  

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
	    highlightStyle.getIconStyle().setScale(20.0);

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

    	var placemark = ge.createPlacemark('');
    	placemark.setName(city.name);
	    ge.getFeatures().appendChild(placemark);
	  
	    // Create style map for placemark
	    var icon = ge.createIcon('');
	    icon.setHref('http://maps.google.com/mapfiles/kml/paddle/red-circle.png');
	    var style = ge.createStyle('');
	    style.getIconStyle().setIcon(icon);
	    style.getIconStyle().setScale(1.0);
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

    google.setOnLoadCallback(init);

});