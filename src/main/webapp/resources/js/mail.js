$(document).ready(function(){
	$("#contact_btn").on("click", function() {
		var con_name = $("#con_name").val();
		var con_mail = $("#con_mail").val();
		var con_comments = $("#con_comments").val();
		
		$.ajax({
			url : "/web/sendMail",	
			data : {"con_name" : con_name , "con_mail" : con_mail , "con_comments" : con_comments}
		}).done(function(data) {
			console.log("끝!");
			console.log(data);
		});
		
	});
});



