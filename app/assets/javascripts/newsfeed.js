$(document).ready(function(){
	$(".toggleBtn").click(function(){
		$( ".article" ).fadeOut( "fast" );
		$("#newsfeed").animate({ width: 'toggle' }, 800);
	 	 // alert("The slideToggle() method is finished!");
	});
});