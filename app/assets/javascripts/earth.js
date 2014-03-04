$(document).ready(function(){

	var ge;
    // var kml;
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
      addSampleButton('Show the placemark\'s balloon!', buttonClick);

      //object which has all the countries in the world
      var countries = gon.countries;
      var cities = gon.cities;
      var options = [];

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

      //object which has all the cities in the world

   //    var options = { "format" : "300x250", 
   //    "queryList" : [
   //          {
   //            "title" : "World News",
   //            "q" : "Syria"
   //          },
   //          {
   //            "q" : "Russia"
   //          }
   //        ]

  	// 	};

	  //   var options2 = { "format" : "300x250", 
	  //   "queryList" : [
	  //         {
	  //           "title" : "World News",
	  //           "q" : "Ukraine"
	  //         },
	  //         {
	  //           "q" : "Protesting"
	  //         }
	  //       ]

			// };

	  //   var options3 = { "format" : "300x250", 
	  //   "queryList" : [
	  //         {
	  //           "title" : "World News",
	  //           "q" : "Syria"
	  //         },
	  //         {
	  //           "q" : "Russia"
	  //         }
	  //       ]

			// };

	  //   var options4 = { "format" : "300x250", 
	  //   "queryList" : [
	  //         {
	  //           "title" : "World News",
	  //           "q" : "Syria"
	  //         },
	  //         {
	  //           "q" : "Russia"
	  //         }
	  //       ]

			// };

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
      //ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, true);
      //adding terrain layer
      // var layerRoot = ge.getLayerRoot();
      // var terrainLayer = layerRoot.getLayerById(ge.LAYER_TERRAIN);
      // terrainLayer.setVisibility(true);

      //creating the placemark for every country in the world
      var countries = gon.countries;
      var cities = gon.cities;
      // var placemark = [];
      // var point = [];

      // function setPlacemark(country, index){
      // 	placemark[index] = ge.createPlacemark('');
      // }
      // countries.forEach(setPlacemark);

      // function setPoint(country,index){
      // 	point[index] = ge.createPoint('');
      // 	point[index].setLatitude(50);
      // 	point[index].setLongitude(50);
      // 	console.log(point[index]);
      // }
      // console.log("********HEY FRANKLIN*****");
      // countries.forEach(setPoint);

      // function addPlacemarkToPoint(placemark,index){
      // 	//adding the point to the placemark
      // 	placemark[index].setGeometry(point[index]);
      // 	//adding the placemark to the earth
      // 	ge.getFeatures().appendChild(placemark[index]);
      // 	placemark[index].setName("Click me please sir.");
      // }
      // placemark.forEach(addPlacemarkToPoint);


      // placemark = ge.createPlacemark('');
      // var point = ge.createPoint('');
      // point.setLatitude(37);
      // point.setLongitude(-122);
      // placemark.setGeometry(point);

      // //adding the placemark to the earth
      // ge.getFeatures().appendChild(placemark);




      //zooming in on the placemark we just made
      // var la = ge.createLookAt('');
      // la.set(43, -79,
      //   0, // altitude
      //   ge.ALTITUDE_RELATIVE_TO_GROUND,
      //   0, // heading
      //   0, // straight-down tilt
      //   5000 // range (inverse of zoom)
      //   );
      // ge.getView().setAbstractView(la);

      //giving the placemark a name and description (a balloon will automatically show on click)
      // placemark.setName("Click me please sir.");

      // google.earth.addEventListener(placemark, "click", function(event){
      // 	event.preventDefault();

      // 	var balloon = ge.createHtmlStringBalloon("");
      // 	balloon.setFeature(event.getTarget());
      // 	balloon.setMaxWidth(300);

      // 	balloon.setContentString("HEY MAN");
      // 	ge.setBalloon(balloon);
      // });

      //creating the world placemarks at the beginning
      countries.forEach(createPlacemark);
      
      createPlacemark2();

    }

    function createPlacemark(country){
    	var placemark = ge.createPlacemark('');
    	placemark.setName(country.name);
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

    google.setOnLoadCallback(init);

});