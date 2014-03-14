$(document).ready(function(){

	// addButtonsToNavbar();

	// function addButtonsToNavbar(){
	// 	addSampleButton('Sign Up', createUser);
	// 	addSampleButton('Login', loginUser);
	// 	addSampleButton("Log Out!", logoutUser);
	// }

	// function addSampleButton(caption, clickHandler) {
	//   var btn = document.createElement('input');
	//   btn.type = 'button';
	//   btn.value = caption;
	  
	//   if (btn.attachEvent)
	//     btn.attachEvent('onclick', clickHandler);
	//   else
	//     btn.addEventListener('click', clickHandler, false);

	//   // add the button to the Sample UI
	//   document.getElementById('sample-ui').appendChild(btn);
	// }


	$("#login_btn").click(function(){
		$("#login_form").dialog({
		  autoOpen: false,
		  height: 300,
		  width: 300,
		  modal: true,
		  dialogClass: "success-dialog",
		  close: function(){
		  }
		});
		$("#login_form").dialog("open");
	});

	$("#signup_btn").click(function(){
		$("#sign_up_form").dialog({
		  autoOpen: false,
		  height: 300,
		  width: 300,
		  modal: true, 
		  close: function(){
		  }
		});
		$("#sign_up_form").dialog("open");
	});

});