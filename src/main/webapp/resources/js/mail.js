$(document).ready(function(){
	$("#contact_btn").on("click", function() {
		var con_name = $("#con_name").val();
		var con_mail = $("#con_mail").val();
		var con_comments = $("#con_comments").val();
		
		$.ajax({
			url : "/web/sendMail",	
			data : {"con_name" : con_name , "con_mail" : con_mail , "con_comments" : con_comments},
			beforeSend:function() {
				$(".overlay").removeClass('display_none');
			}	//로딩
			
		}).done(function(data) {
			$(".overlay").addClass('display_none');
			alert("메세지가 전송되었습니다.");
			$("#con_name").val('');
			$("#con_mail").val('');
			$("#con_comments").val('');
		});
		
	});
});



