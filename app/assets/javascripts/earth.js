$(document).ready(function(){

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

	var ge;
    // var kml;
    var placemark;
    var newsSearch;

    google.load("earth", "1", {"other_params":"sensor=true_or_false"});
    google.load('search', '1');
    google.load("elements", "1", {packages : ["newsshow"]});

    function init() {
      google.earth.createInstance('map3d', initCB, failureCB);
      addSampleButton('Look up in the sky, kid.', showSky);
      addSampleButton('Homeward Bound', showEarth);
      addSampleButton('Show Sun (Dusk/Dawn)', showSun);
      addSampleButton('Hide Sun', hideSun);
      addSampleButton('Show the placemark\'s balloon!', buttonClick);

      // // Create a search control
      // var searchControl = new google.search.SearchControl();

      // // Create a News Search instance.
      // newsSearch = new google.search.NewsSearch();
      // var extendedArgs = google.search.Search.RESTRICT_EXTENDED_ARGS;

      // // Set searchComplete as the callback function when a search is 
      // // complete.  The newsSearch object will have results in it.
      // newsSearch.setSearchCompleteCallback(this, searchComplete, null);

      // // Search by date (instead of relevence)
      // newsSearch.setRestriction(extendedArgs, {'scoring':'d'});

      // // Add the searcher to the SearchControl
      // searchControl.addSearcher(newsSearch);
          
      // // tell the searcher to draw itself and tell it where to attach
      // searchControl.draw(document.getElementById("content"));

      // // A good sport
      // searchControl.execute('President');

      // // Include the required Google branding
      // google.search.Search.getBranding('branding');

      var options = { "format" : "300x250", 
      "queryList" : [
            {
              "title" : "World News",
              "q" : "Syria"
            },
            {
              "q" : "Russia"
            }
          ]

  		};

		    var options2 = { "format" : "300x250", 
		    "queryList" : [
		          {
		            "title" : "World News",
		            "q" : "Ukraine"
		          },
		          {
		            "q" : "Protesting"
		          }
		        ]

				};

	    var options3 = { "format" : "300x250", 
	    "queryList" : [
	          {
	            "title" : "World News",
	            "q" : "Syria"
	          },
	          {
	            "q" : "Russia"
	          }
	        ]

			};

	    var options4 = { "format" : "300x250", 
	    "queryList" : [
	          {
	            "title" : "World News",
	            "q" : "Syria"
	          },
	          {
	            "q" : "Russia"
	          }
	        ]

			};

      var content = document.getElementById("content");
      var content2 = document.getElementById("content");
      var content3 = document.getElementById("content3");
      var content4 = document.getElementById("content4");

      //var newsShow = new google.elements.NewsShow(content,options);
      //var newsShow2 = new google.elements.NewsShow(content2,options2);
      // var newsShow3 = new google.elements.NewsShow(content3,options3);
      // var newsShow4 = new google.elements.NewsShow(content4,options4);

    }

    function initCB(instance) {
      ge = instance;
      ge.getWindow().setVisibility(true);
      
      // add a navigation control
      ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

      // add some layers
      ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
      //ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);
      ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, true);
      //adding terrain layer
      var layerRoot = ge.getLayerRoot();
      var terrainLayer = layerRoot.getLayerById(ge.LAYER_TERRAIN);
      terrainLayer.setVisibility(true);

      //creating the placemark
      placemark = ge.createPlacemark('');
      var point = ge.createPoint('');
      point.setLatitude(37);
      point.setLongitude(-122);
      placemark.setGeometry(point);

      //adding the placemark to the earth
      ge.getFeatures().appendChild(placemark);

      //zooming in on the placemark we just made
      var la = ge.createLookAt('');
      la.set(43, -79,
        0, // altitude
        ge.ALTITUDE_RELATIVE_TO_GROUND,
        0, // heading
        0, // straight-down tilt
        5000 // range (inverse of zoom)
        );
      ge.getView().setAbstractView(la);

      //giving the placemark a name and description (a balloon will automatically show on click)
      placemark.setName("Click me please sir.");

      google.earth.addEventListener(placemark, "click", function(event){
      	event.preventDefault();

      	var balloon = ge.createHtmlStringBalloon("");
      	balloon.setFeature(event.getTarget());
      	balloon.setMaxWidth(300);

      	balloon.setContentString("HEY MAN");
      	ge.setBalloon(balloon);
      });

      //creating the world placemarks at the beginning
      createPlacemark();
      createPlacemark2();

    }

    function createPlacemark() {
      var placemark = ge.createPlacemark('');
      placemark.setName("Toronto?");
      ge.getFeatures().appendChild(placemark);
    
      // Create style map for placemark
      var icon = ge.createIcon('');
      icon.setHref('http://maps.google.com/mapfiles/kml/shapes/triangle.png');
      var style = ge.createStyle('');
      style.getIconStyle().setIcon(icon);
      style.getIconStyle().setScale(5.0);
      placemark.setStyleSelector(style);
    
      // Create point
      var point = ge.createPoint('');
      point.setLatitude(43);
      point.setLongitude(-79);
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
  	            "title" : "GTA",
  	            "q" : "Toronto"
  	          },
  	          {
  	            "q" : "Rob Ford"
  	          }
  	        ]
  	        // ,"scoring" : "tp"

  			};
  		var content = document.getElementById("content");
  		var newsShow = new google.elements.NewsShow(content,options);

  		
      });
    
    }
    function createPlacemark2() {
      var placemark = ge.createPlacemark('');
      placemark.setName("Niagara Falls");
      ge.getFeatures().appendChild(placemark);
    
      // Create style map for placemark
      var icon = ge.createIcon('');
      icon.setHref('http://maps.google.com/mapfiles/kml/shapes/triangle.png');
      var style = ge.createStyle('');
      style.getIconStyle().setIcon(icon);
      placemark.setStyleSelector(style);
    
      // Create point
      var point = ge.createPoint('');
      point.setLatitude(43.096214);
      point.setLongitude(-79.037739);
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
  	            "title" : "Niagara Falls",
  	            "q" : "Niagara Falls"
  	          },
  	          {
  	            "q" : "TLC"
  	          }
  	        ]
  	        // ,"scoring" : "tp"

  			};
  		var content = document.getElementById("content");
  		var newsShow = new google.elements.NewsShow(content,options);

  		
      });
    
    }


    //for clicking the button
    function buttonClick(){
    	var balloon = ge.createFeatureBalloon('');
    	balloon.setMaxWidth(300);
    	balloon.setFeature(placemark);
    	ge.setBalloon(balloon);
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

    function searchComplete() {

      // Check that we got results
      document.getElementById('content').innerHTML = '';
      if (newsSearch.results && newsSearch.results.length > 0) {
        for (var i = 0; i < newsSearch.results.length; i++) {

          // Create HTML elements for search results
          var p = document.createElement('p');
          var a = document.createElement('a');
          a.href = newsSearch.results[i].url;
          a.innerHTML = newsSearch.results[i].title;

          // Append search results to the HTML nodes
          p.appendChild(a);
          document.body.appendChild(p);
        }
      }
    }

    google.setOnLoadCallback(init);


});