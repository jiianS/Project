function contact_me() {
	var con_name = $("#con_name").val();
	var con_mail = $("#con_mail").val();
	var con_comments = $("#con_comments").val();
	
	if(!con_name || !con_mail || !con_comments ){
		alert("보내고싶은 메시지를 입력해주세요");
		return false
		
	}else{
		$("#contact_btn").prop("disabled", true);
		$.ajax({
			url : "/sendMail",	
			data : {"con_name" : con_name , "con_mail" : con_mail , "con_comments" : con_comments},
			beforeSend:function() {
				$(".overlay").removeClass('display_none');
			}	//로딩
			
		}).done(function(data) {
			$(".overlay").addClass('display_none');
			alert("메세지가 전송되었습니다.");
			$("#con_comments").val('');
		});
	}
}