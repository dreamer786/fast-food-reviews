$(document).ready(function{


	$("#username").change(function{
		if (document.getElementById("#username").value === null || document.getElementById("#username").value === ""){
			$("#username").focus();
			$("#username").backgroundColor("red");
			alert("Enter username");
		}
		if (document.getElementById("#username").length < 8){
			$("#username").focus();
			$("#username").backgroundColor("lightblue");
			alert("Not enough characters");
		}
	});

});